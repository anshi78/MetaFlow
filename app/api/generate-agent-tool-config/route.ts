import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { jsonConfig } = await req.json();

    if (!jsonConfig) {
      return NextResponse.json({ error: "Missing jsonConfig" }, { status: 400 });
    }

    // 1. Initialize model with gemini-1.5-flash
    const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",

      // 2. Optional: Set safety settings to prevent false-positive blocks 
      // on technical/code data
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    // 3. Construct a clear, multi-part prompt
    const promptParts = [
      { text: "Generate an AI agent instruction prompt and tool configuration based on the following workflow JSON." },
      { text: "Output must be ONLY valid JSON matching this schema: { systemPrompt: string, primaryAgentName: string, agents: Array, tools: Array }." },
      { text: "Return only the JSON object, no markdown, no backticks, and no conversational text." },
      { text: `Flow Configuration: ${JSON.stringify(jsonConfig)}` }
    ];

    const result = await model.generateContent(promptParts);
    const response = await result.response;

    // 4. Robust check for candidates to avoid "undefined contents" error
    if (!response.candidates || response.candidates.length === 0) {
      return NextResponse.json(
        { error: "Gemini blocked the prompt or returned no results. Check safety settings." },
        { status: 500 }
      );
    }

    const text = response.text();
    
    // 5. Clean up any accidental markdown formatting
    const cleanedJsonString = text.replace(/```json|```/g, "").trim();

    try {
      const parsedData = JSON.parse(cleanedJsonString);
      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error("JSON Parse Error. Raw Output:", text);
      return NextResponse.json(
        { error: "Model returned invalid JSON format.", rawOutput: text },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("Gemini API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during generation." },
      { status: 500 }
    );
  }
}