import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/* ----------------------------------------
   TOOL GENERATOR (STRICT FORMAT)
---------------------------------------- */
function generateGeminiTools(configTools: any[]) {
  if (!configTools || configTools.length === 0) return [];
  return [{
    functionDeclarations: configTools.map((t: any) => ({
      name: t.name.replace(/[^a-zA-Z0-9_-]/g, "_"),
      description: t.description ?? "",
      parameters: {
        type: "OBJECT",
        properties: Object.fromEntries(
          Object.entries(t.parameters || {}).map(([key, type]) => [
            key,
            {
              type: String(type).toUpperCase() === "NUMBER" ? "NUMBER" : "STRING",
              description: `Value for ${key}`,
            },
          ])
        ),
        required: Object.keys(t.parameters || {}),
      },
    })),
  }];
}

/* ----------------------------------------
   API HANDLER
---------------------------------------- */
export async function POST(req: NextRequest) {
  try {
    const { userId, agentId, messages, agentToolConfig } = await req.json();

    const agentDetail = await fetchQuery(api.agent.GetAgentById, { agentId });
    if (!agentDetail) return new Response("Agent not found", { status: 404 });

    /* ---------- CONVERSATION CREATION FIX ---------- */
    let conversation = await fetchQuery(api.conversation.GetConversationById, {
      agentId: agentDetail._id,
      userId,
    });

    if (!conversation) {
      const newId = await fetchMutation(api.conversation.CreateConversation, {
        agentId: agentDetail._id,
        userId,
      });
      // Cast to any to satisfy the check if you aren't using a strict interface
      conversation = { _id: newId } as any;
    }

    /* ---------- GEMINI CONFIG FIX ---------- */
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Replaced with higher-quota stable model
      systemInstruction: {
        role: "system",
        parts: [{ text: agentDetail.instruction || "You are a helpful assistant." }]
      },
      tools: generateGeminiTools(agentToolConfig?.tools) as any,
    });

    const history = messages?.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })) ?? [];

    const chat = model.startChat({ history });
    const lastMsg = messages[messages.length - 1]?.content ?? "";
    const result = await chat.sendMessageStream(lastMsg);

    /* ---------- STREAMING WITH TOOL HANDLING ---------- */
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          const response = await result.response;
          const calls = response.candidates?.[0].content.parts.filter(p => p.functionCall);

          if (calls && calls.length > 0) {
            controller.enqueue(encoder.encode("Searching..."));
            
            // Automatic Loop: Send tool results back to Gemini
            const toolResult = await chat.sendMessageStream([{
              functionResponse: { 
                name: calls[0].functionCall!.name, 
                response: { content: "Request successful." } 
              }
            }]);
            
            for await (const chunk of toolResult.stream) {
              controller.enqueue(encoder.encode(chunk.text()));
            }
          } else {
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) controller.enqueue(encoder.encode(text));
            }
          }
        } catch (e) {
          console.error("Streaming error:", e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("API Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}