import { generateText } from "ai"
import { sendEmail } from "email-utils" // Assuming an email utility is available

export const runtime = "nodejs"

interface SegmentRequest {
  customerData: Array<{
    id: string
    purchases: number
    totalSpent: number
    lastPurchase: string
  }>
}

export async function POST(request: Request) {
  try {
    const body: SegmentRequest = await request.json()

    const dataString = body.customerData
      .slice(0, 100)
      .map((c) => `ID: ${c.id}, Purchases: ${c.purchases}, Spent: $${c.totalSpent}, Last: ${c.lastPurchase}`)
      .join("\n")

    const prompt = `
Segment the following customer data into meaningful business segments:

Customer Data Sample:
${dataString}

Provide segmentation analysis as JSON:
{
  "segments": [
    {
      "id": "string",
      "name": "string",
      "size": number,
      "characteristics": ["string"],
      "metrics": {
        "avg_purchase_value": number,
        "purchase_frequency": number,
        "retention_rate": number,
        "clv": number
      },
      "recommended_actions": ["string"]
    }
  ],
  "segmentation_quality": number,
  "overall_insights": ["string"]
}
`

    const { text } = await generateText({
      model: "google/gemini-2.0-flash",
      prompt,
      system:
        "You are a customer analytics expert. Create meaningful customer segments based on behavioral and financial data. Respond only with valid JSON.",
    })

    const segmentation = JSON.parse(text)

    // Send email notification with segmentation results
    await sendEmail({
      to: "admin@example.com",
      subject: "Customer Segmentation Results",
      body: JSON.stringify(segmentation, null, 2),
    })

    return Response.json({
      success: true,
      data: {
        totalCustomers: body.customerData.length,
        segmentation,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Segmentation error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to segment customers",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
