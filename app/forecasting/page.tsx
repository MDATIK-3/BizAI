"use client"

import { useState } from "react"
import { ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ForecastChart from "@/components/forecast-chart"
import ForecastMetrics from "@/components/forecast-metrics"

export default function ForecastingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m")
  const [selectedProduct, setSelectedProduct] = useState("all")

  const periods = [
    { id: "1m", label: "1 Month" },
    { id: "3m", label: "3 Months" },
    { id: "6m", label: "6 Months" },
    { id: "1y", label: "1 Year" },
  ]

  const products = [
    { id: "all", name: "All Products" },
    { id: "product-a", name: "Product A" },
    { id: "product-b", name: "Product B" },
    { id: "product-c", name: "Product C" },
  ]

  const forecastAccuracy = 87.5
  const trendIndicator = "up"
  const predictedGrowth = "+12.5%"

  const recommendations = [
    {
      id: 1,
      title: "Increase inventory for Q2",
      confidence: 92,
      impact: "high",
      description: "Demand forecast shows 25% increase in product A sales",
    },
    {
      id: 2,
      title: "Market expansion opportunity",
      confidence: 78,
      impact: "medium",
      description: "Emerging markets showing strong growth potential",
    },
    {
      id: 3,
      title: "Seasonal adjustment needed",
      confidence: 85,
      impact: "high",
      description: "Historical patterns indicate Q3 demand spike",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">Demand Forecasting</h1>
          </div>
        </header>

        <div className="px-6 py-8">
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex gap-2">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPeriod === period.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="px-4 py-2 rounded-lg bg-card border border-border text-foreground text-sm"
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id} className="bg-card">
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
          </div>

          {/* Key Metrics */}
          <ForecastMetrics accuracy={forecastAccuracy} trend={trendIndicator} growth={predictedGrowth} />

          {/* Forecast Chart */}
          <Card className="p-6 bg-card border-border mb-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Demand Forecast</h3>
              <p className="text-sm text-muted-foreground">
                Historical data and AI-powered predictions for the next{" "}
                {selectedPeriod === "1m"
                  ? "month"
                  : selectedPeriod === "3m"
                    ? "3 months"
                    : selectedPeriod === "6m"
                      ? "6 months"
                      : "year"}
              </p>
            </div>
            <ForecastChart period={selectedPeriod} />
          </Card>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
            {recommendations.map((rec) => (
              <Card
                key={rec.id}
                className="p-5 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {rec.title}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          rec.impact === "high" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {rec.impact === "high" ? "High Impact" : "Medium Impact"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{rec.confidence}%</p>
                      <p className="text-xs text-muted-foreground">Confidence</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
