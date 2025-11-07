"use client"

import { useState } from "react"
import { Send, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface InsightChatProps {
  insight: {
    id: number
    title: string
    description: string
    actionItems: string[]
  }
  onClose: () => void
}

export default function InsightChat({ insight, onClose }: InsightChatProps) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: `I'm here to help you understand the "${insight.title}" insight. What would you like to know?`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const responses = [
      "Based on the data, this insight suggests we should prioritize these action items immediately. The confidence level of 87% indicates strong predictive accuracy.",
      "This recommendation is derived from multiple data sources and validated against historical patterns. I recommend implementing the suggested actions in the order provided.",
      "The potential impact is significant if we act within the next 2 weeks. Market windows like these typically close quickly.",
      "You can share this analysis with your team to get broader input. Would you like me to help format this for a presentation?",
    ]

    const response = responses[Math.floor(Math.random() * responses.length)]
    setMessages((prev) => [...prev, { role: "assistant", content: response }])
    setIsLoading(false)
  }

  return (
    <>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Ask AI about this insight</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-4 flex flex-col">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-3">
              <Loader2 className="w-4 h-4 text-foreground animate-spin" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-border flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a question..."
          className="bg-card border-border text-foreground"
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </>
  )
}
