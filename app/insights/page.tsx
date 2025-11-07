"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import InsightCard from "@/components/insight-card"
import InsightChat from "@/components/insight-chat"
import InsightDetailPanel from "./InsightDetailPanel" // Ensure this import is correct

export default function InsightsPage() {
  const [selectedInsight, setSelectedInsight] = useState<number | null>(0)
  const [isChattingAbout, setIsChattingAbout] = useState<number | null>(null)

  const insights = [
    {
      id: 1,
      title: "Customer Lifetime Value Growth",
      category: "Opportunity",
      confidence: 94,
      description:
        "Analysis of your customer data reveals a 23% increase in CLV over the last quarter. This growth is driven primarily by improved retention rates and increased order frequency.",
      impact: "high",
      metric: "+23%",
      actionItems: [
        "Increase marketing spend on high-value customer segments",
        "Implement loyalty program for top 20% customers",
        "Develop VIP support tier",
      ],
      source: "Customer segmentation model",
    },
    {
      id: 2,
      title: "Supply Chain Optimization",
      category: "Risk",
      confidence: 87,
      description:
        "Current logistics pattern shows 15% inefficiency in warehouse distribution. Redistribution to regional hubs could reduce delivery times by 2-3 days.",
      impact: "high",
      metric: "-15%",
      actionItems: [
        "Evaluate regional hub feasibility",
        "Calculate ROI for logistics restructuring",
        "Plan phased rollout timeline",
      ],
      source: "Document analysis + Operational data",
    },
    {
      id: 3,
      title: "Seasonal Demand Patterns",
      category: "Insight",
      confidence: 91,
      description:
        "Historical data indicates strong Q4 performance. However, Q1 typically sees a 18% dip. Pre-planning promotional strategies now could mitigate losses.",
      impact: "medium",
      metric: "-18%",
      actionItems: [
        "Design Q1 promotional calendar",
        "Prepare clearance strategies for Q4 overflow",
        "Plan inventory adjustments",
      ],
      source: "Historical sales analysis",
    },
    {
      id: 4,
      title: "Market Competitor Analysis",
      category: "Opportunity",
      confidence: 78,
      description:
        "Competitors are shifting focus to emerging markets. Your current market position suggests 6-month window to establish stronger presence before major competition.",
      impact: "medium",
      metric: "6 months",
      actionItems: [
        "Research emerging market opportunities",
        "Develop market entry strategy",
        "Allocate expansion budget",
      ],
      source: "Market intelligence documents",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
            <div className="px-6 py-4 flex items-center justify-between">
              <h1 className="text-xl font-bold text-foreground">AI Insights & Recommendations</h1>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Insights
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-auto px-6 py-8">
            {/* Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              {insights.map((insight, idx) => (
                <div
                  key={insight.id}
                  onClick={() => {
                    setSelectedInsight(idx)
                    setIsChattingAbout(null)
                  }}
                  className="cursor-pointer"
                >
                  <InsightCard
                    insight={insight}
                    isSelected={selectedInsight === idx}
                    onChat={() => setIsChattingAbout(insight.id)}
                  />
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <Card className="p-6 bg-gradient-to-r from-primary/20 to-accent/20 border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Insights</p>
                  <p className="text-2xl font-bold text-foreground">{insights.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Confidence</p>
                  <p className="text-2xl font-bold text-primary">
                    {Math.round(insights.reduce((a, b) => a + b.confidence, 0) / insights.length)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">High Impact</p>
                  <p className="text-2xl font-bold text-red-500">
                    {insights.filter((i) => i.impact === "high").length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Data Sources</p>
                  <p className="text-2xl font-bold text-accent">3+</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedInsight !== null && (
          <div className="w-full lg:w-96 border-l border-border bg-card flex flex-col">
            {isChattingAbout !== null ? (
              <InsightChat
                insight={insights.find((i) => i.id === isChattingAbout)!}
                onClose={() => setIsChattingAbout(null)}
              />
            ) : (
              <InsightDetailPanel
                insight={insights[selectedInsight]}
                onChat={() => setIsChattingAbout(insights[selectedInsight].id)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}
