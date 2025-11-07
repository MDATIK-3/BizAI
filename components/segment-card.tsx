"use client"

import { ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface SegmentCardProps {
  segment: {
    id: string
    name: string
    count: number
    revenue: string
    growth: string
    color: string
  }
  isSelected: boolean
  onClick: () => void
}

export default function SegmentCard({ segment, isSelected, onClick }: SegmentCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`p-4 cursor-pointer transition-all border-2 ${
        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-foreground">{segment.name}</h4>
        <ChevronRight
          className={`w-4 h-4 transition-transform ${isSelected ? "text-primary" : "text-muted-foreground"}`}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Customers</span>
          <span className="font-medium text-foreground">{segment.count}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Revenue</span>
          <span className="font-medium text-foreground">{segment.revenue}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Growth</span>
          <span className={`font-medium ${segment.growth.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
            {segment.growth}
          </span>
        </div>
      </div>
    </Card>
  )
}
