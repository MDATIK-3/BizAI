"use client"

import { TrendingUp, BarChart3, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ForecastMetricsProps {
  accuracy: number
  trend: "up" | "down"
  growth: string
}

export default function ForecastMetrics({ accuracy, trend, growth }: ForecastMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Model Accuracy</p>
            <p className="text-3xl font-bold text-primary">{accuracy}%</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/20">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Market Trend</p>
            <p className="text-3xl font-bold text-accent">{trend === "up" ? "Bullish" : "Bearish"}</p>
          </div>
          <div className={`p-3 rounded-lg ${trend === "up" ? "bg-green-500/20" : "bg-red-500/20"}`}>
            <TrendingUp
              className={`w-6 h-6 ${trend === "up" ? "text-green-500" : "text-red-500"} ${trend === "down" && "rotate-180"}`}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-amber-500/20 to-amber-500/5 border-amber-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Predicted Growth</p>
            <p className="text-3xl font-bold text-amber-500">{growth}</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/20">
            <Zap className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </Card>
    </div>
  )
}
