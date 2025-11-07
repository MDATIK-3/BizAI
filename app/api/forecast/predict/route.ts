import { generateForecastWithGemini } from "@/lib/gemini"
import { sendForecastNotification } from "@/lib/email-service"

export const runtime = "nodejs"

interface ForecastRequest {
  historicalData: Array<{ month: string; value: number }>
  forecastPeriod: number
  productId?: string
  userEmail?: string
  notifyUser?: boolean
}

export async function POST(request: Request) {
  try {
    const body: ForecastRequest = await request.json()

    const dataString = body.historicalData.map((d) => `${d.month}: ${d.value}`).join(", ")

    const prompt = `
Based on the historical sales data, generate a ${body.forecastPeriod}-month demand forecast.

Historical Data:
${dataString}

Provide forecast in this JSON format:
{
  "forecast": [
    {
      "period": "Month/Year",
      "predicted": number,
      "confidence": number,
      "lower_bound": number,
      "upper_bound": number
    }
  ],
  "accuracy_metrics": {
    "mae": number,
    "rmse": number,
    "mape": number
  },
  "trend": "upward|downward|stable",
  "seasonality_detected": boolean,
  "key_drivers": ["string"]
}
`

    const text = await generateForecastWithGemini(prompt)
    const forecast = JSON.parse(text)

    if (body.notifyUser && body.userEmail) {
      const forecastSummary = `Trend: ${forecast.trend}, Confidence: ${forecast.forecast[0]?.confidence || 0}%`
      await sendForecastNotification(body.userEmail, forecastSummary)
    }

    return Response.json({
      success: true,
      data: forecast,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Forecast error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to generate forecast",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
