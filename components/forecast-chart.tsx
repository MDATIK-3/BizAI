"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ForecastChartProps {
  period: string
}

export default function ForecastChart({ period }: ForecastChartProps) {
  // Generate sample data based on period
  const data = [
    { month: "Jan", actual: 4000, forecast: 4200, lower: 3800, upper: 4600 },
    { month: "Feb", actual: 4500, forecast: 4600, lower: 4100, upper: 5100 },
    { month: "Mar", actual: 3800, forecast: 4000, lower: 3500, upper: 4500 },
    { month: "Apr", actual: 5200, forecast: 5100, lower: 4600, upper: 5600 },
    { month: "May", actual: 5800, forecast: 6000, lower: 5400, upper: 6600 },
    { month: "Jun", actual: 6200, forecast: 6500, lower: 5900, upper: 7100 },
    { month: "Jul", actual: null, forecast: 7000, lower: 6300, upper: 7700 },
    { month: "Aug", actual: null, forecast: 7200, lower: 6400, upper: 8000 },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.55 0.28 274)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.55 0.28 274)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0 0)" />
        <XAxis dataKey="month" stroke="oklch(0.65 0 0)" />
        <YAxis stroke="oklch(0.65 0 0)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "oklch(0.13 0 0)",
            border: "1px solid oklch(0.20 0 0)",
            borderRadius: "0.625rem",
            color: "oklch(0.95 0 0)",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="actual"
          stroke="oklch(0.58 0.25 193)"
          fill="none"
          strokeWidth={2}
          name="Actual Demand"
        />
        <Area
          type="monotone"
          dataKey="forecast"
          stroke="oklch(0.55 0.28 274)"
          fillOpacity={1}
          fill="url(#colorForecast)"
          strokeWidth={2}
          name="Forecasted Demand"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
