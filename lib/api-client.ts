// Client-side API utilities for the Biz AI platform

export const apiClient = {
  async generateInsights(
    documentContent: string,
    dataType: "sales" | "customer" | "forecast" | "general" = "general",
    analysisDepth: "standard" | "deep" | "enterprise" = "standard",
  ) {
    const response = await fetch("/api/insights/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentContent,
        dataType,
        analysisDepth,
      }),
    })

    if (!response.ok) throw new Error("Failed to generate insights")
    return response.json()
  },

  async generateForecast(
    historicalData: Array<{ month: string; value: number }>,
    forecastPeriod = 6,
    productId?: string,
  ) {
    const response = await fetch("/api/forecast/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        historicalData,
        forecastPeriod,
        productId,
      }),
    })

    if (!response.ok) throw new Error("Failed to generate forecast")
    return response.json()
  },

  async processDocument(documentText: string, documentType: string, fileName: string) {
    const response = await fetch("/api/documents/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentText,
        documentType,
        fileName,
      }),
    })

    if (!response.ok) throw new Error("Failed to process document")
    return response.json()
  },

  async segmentCustomers(
    customerData: Array<{
      id: string
      purchases: number
      totalSpent: number
      lastPurchase: string
    }>,
  ) {
    const response = await fetch("/api/customers/segment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerData,
      }),
    })

    if (!response.ok) throw new Error("Failed to segment customers")
    return response.json()
  },

  async chatWithAI(messages: Array<{ role: "user" | "assistant"; content: string }>) {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) throw new Error("Failed to get AI response")
    return response.json()
  },

  async downloadDocument(docName: string, docContent: string, docType: string) {
    const mimeTypes: Record<string, string> = {
      pdf: "application/pdf",
      csv: "text/csv",
      txt: "text/plain",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }

    const mimeType = mimeTypes[docType] || "application/octet-stream"
    const blob = new Blob([docContent], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = docName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },
}
