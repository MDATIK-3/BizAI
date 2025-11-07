"use client"

import { MessageCircle, Copy, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Insight {
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

interface InsightDetailPanelProps {
  insight: Insight
  onChat: () => void
}

export default function InsightDetailPanel({ insight, onChat }: InsightDetailPanelProps) {
  return (
    <>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              insight.impact === "high" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {insight.impact === "high" ? "High Impact" : "Medium Impact"}
          </span>
          <span className="text-sm text-muted-foreground">{insight.confidence}% Confidence</span>
        </div>
        <h2 className="text-xl font-bold text-foreground">{insight.title}</h2>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Recommended Actions</h3>
          <ul className="space-y-2">
            {insight.actionItems.map((action, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                  {idx + 1}
                </span>
                <span className="text-muted-foreground">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Data Source</h3>
          <p className="text-xs text-muted-foreground px-3 py-2 bg-muted rounded">{insight.source}</p>
        </div>
      </div>

      <div className="p-6 border-t border-border flex gap-2">
        <Button onClick={onChat} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
          <MessageCircle className="w-4 h-4 mr-2" />
          Ask AI
        </Button>
        <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
          <Copy className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </>
  )
}
