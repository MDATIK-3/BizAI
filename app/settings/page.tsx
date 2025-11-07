"use client"

import { useState } from "react"
import { Settings, Database, Bell, Shield, Key, LogOut, Save, Eye, EyeOff, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState({
    insights: true,
    forecasts: true,
    documents: true,
    recommendations: true,
  })

  const tabs = [
    { id: "general", name: "General", icon: Settings },
    { id: "integrations", name: "Integrations", icon: Database },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
  ]

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
          </div>
        </header>

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* General Settings */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <Card className="p-6 bg-card border-border">
                    <h2 className="text-lg font-semibold text-foreground mb-6">Company Information</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                        <Input
                          placeholder="Enter company name"
                          defaultValue="Acme Corporation"
                          className="bg-muted border-border text-foreground"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                          <Input
                            type="email"
                            placeholder="contact@example.com"
                            defaultValue="admin@acmecorp.com"
                            className="bg-muted border-border text-foreground"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                          <Input placeholder="+1 (555) 000-0000" className="bg-muted border-border text-foreground" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Business Type</label>
                        <select className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground">
                          <option>E-commerce</option>
                          <option>SaaS</option>
                          <option>Retail</option>
                          <option>Manufacturing</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card border-border">
                    <h2 className="text-lg font-semibold text-foreground mb-4">AI Model Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Analysis Depth</p>
                          <p className="text-sm text-muted-foreground">
                            Deeper analysis takes longer but provides more insights
                          </p>
                        </div>
                        <select className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm">
                          <option>Standard</option>
                          <option>Deep</option>
                          <option>Enterprise</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Update Frequency</p>
                          <p className="text-sm text-muted-foreground">How often insights are regenerated</p>
                        </div>
                        <select className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm">
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Integrations */}
              {activeTab === "integrations" && (
                <div className="space-y-4">
                  {[
                    { name: "Salesforce", status: "connected", icon: "☁️" },
                    { name: "Google Analytics", status: "connected", icon: "📊" },
                    { name: "Stripe", status: "pending", icon: "💳" },
                    { name: "Slack", status: "disconnected", icon: "💬" },
                  ].map((integration) => (
                    <Card
                      key={integration.name}
                      className="p-6 bg-card border-border flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <p className="font-medium text-foreground">{integration.name}</p>
                          <p
                            className={`text-sm ${
                              integration.status === "connected"
                                ? "text-green-500"
                                : integration.status === "pending"
                                  ? "text-yellow-500"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {integration.status === "connected"
                              ? "✓ Connected"
                              : integration.status === "pending"
                                ? "⏳ Pending"
                                : "Not connected"}
                          </p>
                        </div>
                      </div>
                      <Button
                        className={
                          integration.status === "connected"
                            ? "bg-muted text-foreground hover:bg-muted/80"
                            : "bg-primary hover:bg-primary/90 text-primary-foreground"
                        }
                      >
                        {integration.status === "connected" ? "Manage" : "Connect"}
                      </Button>
                    </Card>
                  ))}
                </div>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <Card className="p-6 bg-card border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Email Notification Preferences</h2>
                  <div className="space-y-6">
                    {[
                      {
                        key: "insights",
                        title: "New Insights Generated",
                        description: "Get notified when new insights are available via email",
                      },
                      {
                        key: "forecasts",
                        title: "Forecast Updates",
                        description: "Receive daily forecast accuracy and prediction updates",
                      },
                      {
                        key: "documents",
                        title: "Document Processing Complete",
                        description: "Alert when uploaded documents are fully processed",
                      },
                      {
                        key: "recommendations",
                        title: "High-Impact Recommendations",
                        description: "Notify about time-sensitive business opportunities via email",
                      },
                    ].map((notif) => (
                      <div
                        key={notif.key}
                        className="flex items-center justify-between pb-6 border-b border-border last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="font-medium text-foreground">{notif.title}</p>
                            <p className="text-sm text-muted-foreground">{notif.description}</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={emailNotifications[notif.key as keyof typeof emailNotifications]}
                          onChange={(e) =>
                            setEmailNotifications({
                              ...emailNotifications,
                              [notif.key]: e.target.checked,
                            })
                          }
                          className="w-5 h-5 rounded border-border bg-muted"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <Card className="p-6 bg-card border-border">
                    <h2 className="text-lg font-semibold text-foreground mb-6">API Keys</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">API Key</label>
                        <div className="flex gap-2">
                          <div className="flex-1 relative">
                            <input
                              type={showApiKey ? "text" : "password"}
                              value="sk_live_51234567890abcdef"
                              readOnly
                              className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground font-mono"
                            />
                          </div>
                          <button
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="p-2 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
                          >
                            {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                          <button className="px-4 py-2 rounded-lg bg-muted border border-border text-foreground hover:bg-muted/80 transition-colors">
                            Copy
                          </button>
                        </div>
                      </div>
                      <div>
                        <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                          <Key className="w-4 h-4 mr-2" />
                          Regenerate Key
                        </Button>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card border-border">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Account Security</h2>
                    <div className="space-y-4">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Change Password
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                      >
                        Enable Two-Factor Authentication
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 bg-destructive/10 border border-destructive/30">
                    <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                      <LogOut className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </Card>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 flex gap-4">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
