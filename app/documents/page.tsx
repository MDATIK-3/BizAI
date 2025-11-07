"use client"

import { useState } from "react"
import { FileText, Clock, CheckCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import DocumentUploadZone from "@/components/document-upload-zone"
import DocumentList from "@/components/document-list"
import { apiClient } from "@/lib/api-client"

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Q4 Sales Report 2024",
      type: "pdf",
      size: "2.4 MB",
      uploadedAt: "2 hours ago",
      status: "processed" as const,
      pages: 12,
      content: "Sample PDF content - Q4 Sales Report 2024\n\nThis is a demo document showing sales data...",
    },
    {
      id: 2,
      name: "Customer Feedback Survey",
      type: "csv",
      size: "856 KB",
      uploadedAt: "1 day ago",
      status: "processed" as const,
      pages: 1,
      content: "customer_id,satisfaction,feedback\n1,5,Excellent service\n2,4,Good experience\n3,5,Outstanding",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFilesSelected = async (files: File[]) => {
    setIsUploading(true)

    try {
      const newDocs = await Promise.all(
        files.map(async (file, idx) => {
          const fileId = documents.length + idx + 1
          const fileType = file.name.split(".").pop() || "unknown"

          // Read file content
          const fileContent = await file.text()

          try {
            // Process through API
            await apiClient.processDocument(fileContent, fileType, file.name)

            return {
              id: fileId,
              name: file.name,
              type: fileType,
              size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
              uploadedAt: "just now",
              status: "processed" as const,
              pages: Math.floor(Math.random() * 20) + 1,
              content: fileContent,
            }
          } catch (error) {
            console.error("[v0] Document processing error:", error)
            return {
              id: fileId,
              name: file.name,
              type: fileType,
              size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
              uploadedAt: "just now",
              status: "failed" as const,
              pages: 0,
            }
          }
        }),
      )

      setDocuments([...newDocs, ...documents])
    } catch (error) {
      console.error("[v0] Error handling files:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = (id: number) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const stats = [
    {
      label: "Total Documents",
      value: documents.length,
      icon: FileText,
      color: "text-primary",
    },
    {
      label: "Processed",
      value: documents.filter((d) => d.status === "processed").length,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Processing",
      value: documents.filter((d) => d.status === "processing").length,
      icon: Clock,
      color: "text-yellow-500",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">Documents</h1>
          </div>
        </header>

        <div className="px-6 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="p-6 bg-card border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Upload Zone */}
          <DocumentUploadZone onFilesSelected={handleFilesSelected} isLoading={isUploading} />

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border text-foreground"
              />
            </div>
            <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
              Filter
            </Button>
          </div>

          {/* Document List */}
          <DocumentList documents={filteredDocuments} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  )
}
