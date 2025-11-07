import { generateText } from "ai"

export const runtime = "nodejs"

interface ChatRequest {
  messages: Array<{ role: "user" | "assistant"; content: string }>
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json()

    const { text } = await generateText({
      model: "google/gemini-1.5-flash",
      messages: body.messages,
      system: `You are a helpful business intelligence assistant for the Biz AI platform. 
You help users understand their data, make business decisions, and implement recommendations.
Be concise, actionable, and data-driven in your responses.`,
    })

    return Response.json({
      success: true,
      data: {
        response: text,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Chat error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to process chat message",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
