"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, Brain, TrendingUp, Users, FileText, Zap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLanding() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  const features = [
    {
      icon: FileText,
      title: "Document Intelligence",
      description: "Upload and analyze business documents with RAG-powered insights",
    },
    {
      icon: TrendingUp,
      title: "Demand Forecasting",
      description: "Predict market trends and customer demand with AI models",
    },
    {
      icon: Users,
      title: "Customer Segmentation",
      description: "Automatically segment customers based on behavior patterns",
    },
    {
      icon: Brain,
      title: "AI Insights",
      description: "Get actionable recommendations powered by your business data",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor KPIs and business metrics on interactive dashboards",
    },
    {
      icon: Zap,
      title: "Quick Actions",
      description: "Execute data-driven decisions with confidence",
    },
  ]

  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "Documents", href: "/documents" },
    { name: "Forecasting", href: "/forecasting" },
    { name: "Insights", href: "/insights" },
    { name: "Customers", href: "/customers" },
    { name: "Settings", href: "/settings" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              {sidebarOpen && <span className="font-bold text-lg text-sidebar-foreground">BizAI</span>}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-sidebar-foreground hover:text-sidebar-accent transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left w-full ${
                  item.name === "Dashboard"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-accent"
                } ${!sidebarOpen && "px-2 text-center"}`}
                title={!sidebarOpen ? item.name : ""}
              >
                {sidebarOpen ? item.name : item.name.charAt(0)}
              </button>
            ))}
          </nav>

          <button
            onClick={() => router.push("/documents")}
            className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-200 shadow-lg"
          >
            {sidebarOpen ? "New Analysis" : "+"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block text-foreground hover:text-accent transition-colors duration-200"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold text-foreground">Business Intelligence Dashboard</h1>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <div className="px-6 py-8 md:py-12">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Welcome to Biz AI</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Transform your business data into actionable intelligence. Upload documents, get AI-powered insights, and
              make data-driven decisions with confidence.
            </p>
          </div>

          {/* Quick Start Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card
                  key={idx}
                  onClick={() => {
                    const routes = ["/documents", "/forecasting", "/customers", "/insights", "/", "/settings"]
                    router.push(routes[idx])
                  }}
                  className="p-6 bg-card border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* CTA Section */}
          <Card className="p-8 bg-gradient-to-r from-primary/20 to-accent/20 border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Ready to get started?</h3>
                <p className="text-muted-foreground">Upload your first document and discover AI-powered insights.</p>
              </div>
              <Button
                onClick={() => router.push("/documents")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 rounded-lg font-medium transition-all duration-200"
              >
                Start Analyzing
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
