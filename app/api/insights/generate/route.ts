import { generateInsightsWithGemini } from "@/lib/gemini"
import { sendInsightNotification } from "@/lib/email-service"

export const runtime = "nodejs"

interface InsightRequest {
  documentContent: string
  dataType: "sales" | "customer" | "forecast" | "general"
  analysisDepth: "standard" | "deep" | "enterprise"
  userEmail?: string
  notifyUser?: boolean
}

export async function POST(request: Request) {
  try {
    const body: InsightRequest = await request.json()

    const prompt = `
Analyze the following business data and generate actionable AI insights:

Data Type: ${body.dataType}
Analysis Depth: ${body.analysisDepth}

Document Content:
${body.documentContent}

Generate insights in the following JSON format:
{
  "insights": [
    {
      "title": "string",
      "category": "Opportunity|Risk|Insight",
      "confidence": number (0-100),
      "description": "string",
      "impact": "high|medium|low",
      "metric": "string",
      "actionItems": ["string"],
      "source": "string"
    }
  ],
  "summary": "string",
  "recommendations": ["string"]
}
`

    const text = await generateInsightsWithGemini(prompt)
    const insights = JSON.parse(text)

    if (body.notifyUser && body.userEmail && insights.insights.length > 0) {
      const primaryInsight = insights.insights[0]
      await sendInsightNotification(body.userEmail, primaryInsight.title, insights.summary)
    }

    return Response.json({
      success: true,
      data: insights,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Insight generation error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to generate insights",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
