import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 1. Define the actual logic your tools will execute
const localToolLogic: Record<string, Function> = {
  get_hotels: (args: { location: string }) => {
    return `Results for ${args.location}: 1. Taj Hotel, 2. Hyatt Regency, 3. Novotel. All have availability for your dates.`;
  },
  // Add other local functions here to match your Metaflow/VocalOS tools
};

const generateGeminiTools = (configTools: any[]) => {
  if (!configTools || configTools.length === 0) return [];
  return [{
    functionDeclarations: configTools.map((t) => ({
      name: t.name.replace(/[^a-zA-Z0-9_-]/g, "_"), // Sanitize names
      description: t.description ?? "",
      parameters: {
        type: "OBJECT",
        properties: Object.fromEntries(
          Object.entries(t.parameters || {}).map(([key, type]) => [
            key,
            {
              type: (type as string).toUpperCase() === "NUMBER" ? "NUMBER" : "STRING",
              description: `Parameter ${key}`,
            },
          ])
        ),
        required: Object.keys(t.parameters || {}),
      },
    })),
  }];
};

export async function POST(req: NextRequest) {
  try {
    const { messages, agentToolConfig } = await req.json();
    const { agents, tools } = agentToolConfig;

    const orchestratorInstruction = `...`; // Your instructions

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Higher quota model
      systemInstruction: orchestratorInstruction,
      tools: generateGeminiTools(tools) as any,
    });

    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const lastMsg = messages[messages.length - 1].content;
    
    // Request initial stream
    let result = await chat.sendMessageStream(lastMsg);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          // Resolve the first response to check for function calls
          const response = await result.response;
          const calls = response.candidates?.[0].content.parts.filter(p => p.functionCall);

          if (calls && calls.length > 0) {
            const functionResponses = [];
            for (const part of calls) {
              const { name, args } = part.functionCall!;
              // Map Pune to your tool logic
              const toolData = localToolLogic[name] 
                ? localToolLogic[name](args) 
                : `No data found for ${name}.`;

              functionResponses.push({
                functionResponse: { name, response: { content: toolData } }
              });
            }

            // Send tool results back to get the final answer
            const finalResult = await chat.sendMessageStream(functionResponses);
            for await (const chunk of finalResult.stream) {
              const text = chunk.text();
              if (text) controller.enqueue(encoder.encode(text));
            }
          } else {
            // No tool needed, stream standard text
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Stream Error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, { headers: { "Content-Type": "text/plain" } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}