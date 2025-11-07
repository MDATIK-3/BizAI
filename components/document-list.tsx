"use client"

import { FileText, Download, Trash2, Clock, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { apiClient } from "@/lib/api-client"

interface Document {
  id: number
  name: string
  type: string
  size: string
  uploadedAt: string
  status: "processing" | "processed"
  pages: number
  content?: string
}

interface DocumentListProps {
  documents: Document[]
  onDelete: (id: number) => void
}

export default function DocumentList({ documents, onDelete }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <Card className="p-12 bg-card border-border text-center">
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">No documents uploaded yet</p>
      </Card>
    )
  }

  const handleDownload = (doc: Document) => {
    if (doc.content) {
      apiClient.downloadDocument(doc.name, doc.content, doc.type)
    }
  }

  return (
    <Card className="bg-card border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Document</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Size</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Uploaded</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, idx) => (
              <tr
                key={doc.id}
                className={`border-b border-border hover:bg-muted/50 transition-colors ${
                  idx === documents.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-primary/10">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.pages} pages</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground uppercase">{doc.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{doc.size}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{doc.uploadedAt}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {doc.status === "processed" ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-foreground">Processed</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
                        <span className="text-sm text-foreground">Processing</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDownload(doc)}
                      disabled={!doc.content}
                      className="p-2 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Download document"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(doc.id)}
                      className="p-2 hover:bg-destructive/10 rounded transition-colors text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
