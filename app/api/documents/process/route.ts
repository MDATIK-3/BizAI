import { generateText } from "ai"

export const runtime = "nodejs"

interface DocumentRequest {
  documentText: string
  documentType: string
  fileName: string
}

export async function POST(request: Request) {
  try {
    const body: DocumentRequest = await request.json()

    const prompt = `
Process and analyze the following business document:

File: ${body.fileName}
Type: ${body.documentType}

Content:
${body.documentText.substring(0, 5000)}${body.documentText.length > 5000 ? "..." : ""}

Extract key information and return as JSON:
{
  "summary": "string",
  "key_metrics": {
    "metric_name": "value"
  },
  "extracted_data": {
    "category": ["extracted_item"]
  },
  "potential_insights": ["string"],
  "data_quality_score": number (0-100),
  "recommendations_for_analysis": ["string"]
}
`

    const { text } = await generateText({
      model: "google/gemini-2.0-flash",
      prompt,
      system:
        "You are a document analysis expert. Extract structured data and insights from business documents. Respond only with valid JSON.",
    })

    const analysis = JSON.parse(text)

    return Response.json({
      success: true,
      data: {
        document: {
          fileName: body.fileName,
          documentType: body.documentType,
          processedAt: new Date().toISOString(),
          textLength: body.documentText.length,
        },
        analysis,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Document processing error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to process document",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
