import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { type, format, segmentData } = await request.json()

    if (format === "csv") {
      const csv = generateCSV(segmentData)
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="customer-report.csv"',
        },
      })
    } else if (format === "json") {
      return NextResponse.json(segmentData, {
        headers: {
          "Content-Disposition": 'attachment; filename="customer-report.json"',
        },
      })
    }

    return NextResponse.json({ error: "Invalid format" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Export error:", error)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}

function generateCSV(segmentData: any): string {
  const headers = ["Metric", "Value"]
  const rows: string[][] = []

  // Add segment overview
  rows.push(["SEGMENT OVERVIEW", ""])
  rows.push(["Name", segmentData.name])
  rows.push(["Total Customers", segmentData.count.toString()])
  rows.push(["Revenue", segmentData.revenue])
  rows.push(["Growth", segmentData.growth])
  rows.push(["Retention Rate", segmentData.retention])
  rows.push(["", ""])

  // Add behavioral metrics
  rows.push(["BEHAVIORAL METRICS", ""])
  rows.push(["Average Order Value", segmentData.avgOrderValue])
  rows.push(["Purchase Frequency", segmentData.purchaseFrequency])
  rows.push(["Customer Lifetime Value", segmentData.clv])
  rows.push(["", ""])

  // Add characteristics
  rows.push(["CHARACTERISTICS", ""])
  segmentData.characteristics.forEach((char: string) => {
    rows.push([char, ""])
  })
  rows.push(["", ""])

  // Add recommended actions
  rows.push(["RECOMMENDED ACTIONS", ""])
  segmentData.actions.forEach((action: string) => {
    rows.push([action, ""])
  })

  // Convert to CSV format
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")),
  ].join("\n")

  return csvContent
}
