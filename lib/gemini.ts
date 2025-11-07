import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set")
}

const genAI = new GoogleGenerativeAI(apiKey)

export async function generateInsightsWithGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function generateForecastWithGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  const result = await model.generateContent(prompt)
  return result.response.text()
}
