"use client"

import { Lightbulb, MessageCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

interface InsightCardProps {
  insight: {
    id: number
    title: string
    category: string
    confidence: number
    description: string
    impact: "high" | "medium"
    metric: string
    actionItems: string[]
    source: string
  }
  isSelected: boolean
  onChat: () => void
}

export default function InsightCard({ insight, isSelected, onChat }: InsightCardProps) {
  return (
    <Card
      className={`p-6 border-2 transition-all cursor-pointer ${
        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
            {insight.category}
          </span>
        </div>
        <span className="text-sm font-semibold text-primary">{insight.confidence}%</span>
      </div>

      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{insight.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{insight.description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Expected Impact</p>
          <p className="text-lg font-bold text-foreground">{insight.metric}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onChat()
          }}
          className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </Card>
  )
}
