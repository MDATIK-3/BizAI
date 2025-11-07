"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface SegmentationChartProps {
  segments: Array<{
    id: string
    name: string
    count: number
    color: string
  }>
}

export default function SegmentationChart({ segments }: SegmentationChartProps) {
  const data = segments.map((s) => ({
    name: s.name,
    value: s.count,
    id: s.id,
  }))

  const colors = ["oklch(0.55 0.28 274)", "oklch(0.58 0.25 193)", "oklch(0.70 0.18 50)", "oklch(0.65 0.22 160)"]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "oklch(0.13 0 0)",
            border: "1px solid oklch(0.20 0 0)",
            borderRadius: "0.625rem",
            color: "oklch(0.95 0 0)",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
