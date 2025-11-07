"use client"

import { useState } from "react"
import { Users, TrendingUp, DollarSign, Target, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import SegmentationChart from "@/components/segmentation-chart"
import SegmentCard from "@/components/segment-card"

export default function CustomersPage() {
  const [selectedSegment, setSelectedSegment] = useState("premium")
  const [isExporting, setIsExporting] = useState(false)

  const segments = [
    {
      id: "premium",
      name: "Premium Customers",
      color: "from-primary to-purple-600",
      count: 1240,
      revenue: "$2.4M",
      growth: "+18%",
      clv: "$1950",
      retention: "94%",
      avgOrderValue: "$245",
      purchaseFrequency: "12x/year",
      characteristics: ["High spending", "Loyal", "Early adopters", "Low churn"],
      actions: ["VIP Program", "Early Access", "Personalized Support"],
    },
    {
      id: "growth",
      name: "Growth Potential",
      color: "from-accent to-blue-600",
      count: 3850,
      revenue: "$980K",
      growth: "+32%",
      clv: "$254",
      retention: "67%",
      avgOrderValue: "$78",
      purchaseFrequency: "4x/year",
      characteristics: ["Growing interest", "Price-sensitive", "Seasonal buyers"],
      actions: ["Upsell Campaign", "Loyalty Rewards", "Bundle Offers"],
    },
    {
      id: "atrisk",
      name: "At-Risk Churn",
      color: "from-orange-500 to-red-600",
      count: 892,
      revenue: "$156K",
      growth: "-22%",
      clv: "$175",
      retention: "38%",
      avgOrderValue: "$52",
      purchaseFrequency: "1x/year",
      characteristics: ["Inactive", "One-time buyers", "Low engagement"],
      actions: ["Win-back Campaign", "Special Offers", "Feedback Survey"],
    },
    {
      id: "new",
      name: "New Customers",
      color: "from-green-500 to-emerald-600",
      count: 2130,
      revenue: "$412K",
      growth: "+45%",
      clv: "$194",
      retention: "72%",
      avgOrderValue: "$94",
      purchaseFrequency: "2x/year",
      characteristics: ["Fresh signups", "Exploring", "High potential"],
      actions: ["Onboarding Series", "Product Recommendations", "Referral Program"],
    },
  ]

  const selectedData = segments.find((s) => s.id === selectedSegment)!

  const handleExportReport = async () => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/reports/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "segmentation",
          format: "csv",
          segmentData: selectedData,
        }),
      })

      if (!response.ok) throw new Error("Export failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `customer-report-${selectedSegment}-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Export error:", error)
      alert("Failed to export report")
    } finally {
      setIsExporting(false)
    }
  }

  const metrics = [
    {
      label: "Total Customers",
      value: "8,112",
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Total Revenue",
      value: "$3.95M",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      label: "Avg Retention",
      value: "67.75%",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      label: "Segmentation Score",
      value: "8.2/10",
      icon: Target,
      color: "text-amber-500",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">Customer Segmentation</h1>
            <Button
              onClick={handleExportReport}
              disabled={isExporting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? "Exporting..." : "Export Report"}
            </Button>
          </div>
        </header>

        <div className="px-6 py-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <Card key={metric.label} className="p-6 bg-card border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Customer Distribution</h3>
                <SegmentationChart segments={segments} />
              </Card>
            </div>

            {/* Segment Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Segments</h3>
              {segments.map((segment) => (
                <SegmentCard
                  key={segment.id}
                  segment={segment}
                  isSelected={selectedSegment === segment.id}
                  onClick={() => setSelectedSegment(segment.id)}
                />
              ))}
            </div>
          </div>

          {/* Detailed Segment Analysis */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overview */}
            <Card className={`p-8 bg-gradient-to-br ${selectedData.color}/20 border-0`}>
              <h3 className="text-2xl font-bold text-foreground mb-6">{selectedData.name}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Customers</p>
                  <p className="text-3xl font-bold text-foreground">{selectedData.count}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Revenue</p>
                  <p className="text-3xl font-bold text-foreground">{selectedData.revenue}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Growth</p>
                  <p
                    className={`text-3xl font-bold ${selectedData.growth.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                  >
                    {selectedData.growth}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Retention</p>
                  <p className="text-3xl font-bold text-foreground">{selectedData.retention}</p>
                </div>
              </div>
            </Card>

            {/* Characteristics & Actions */}
            <Card className="p-8 bg-card border-border">
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Characteristics</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedData.characteristics.map((char, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                  Recommended Actions
                </h4>
                <ul className="space-y-3">
                  {selectedData.actions.map((action, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                        ✓
                      </span>
                      <span className="text-sm text-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {/* Behavioral Metrics */}
          <Card className="mt-8 p-8 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Behavioral Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Avg Order Value</p>
                <p className="text-2xl font-bold text-foreground">{selectedData.avgOrderValue}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Purchase Frequency</p>
                <p className="text-2xl font-bold text-foreground">{selectedData.purchaseFrequency}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Customer Lifetime Value</p>
                <p className="text-2xl font-bold text-foreground">{selectedData.clv}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Retention Rate</p>
                <p className="text-2xl font-bold text-foreground">{selectedData.retention}</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
