"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, File, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DocumentUploadZoneProps {
  onFilesSelected: (files: File[]) => void
  isLoading?: boolean
}

export default function DocumentUploadZone({ onFilesSelected, isLoading }: DocumentUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const validTypes = [
        "application/pdf",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]
      return validTypes.includes(file.type) || file.name.match(/\.(pdf|csv|docx|txt)$/i)
    })

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles)
    }
  }

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onFilesSelected(selectedFiles)
      setSelectedFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="mb-8">
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-8 border-2 border-dashed transition-all cursor-pointer ${
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          accept=".pdf,.csv,.docx,.txt"
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center py-12">
          {selectedFiles.length === 0 ? (
            <>
              <div className="p-4 rounded-lg bg-primary/10 mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Drag and drop your documents</h3>
              <p className="text-muted-foreground mb-6">or click to browse. Supports PDF, CSV, DOCX, and TXT files.</p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Select Files
              </Button>
            </>
          ) : (
            <>
              <div className="w-full max-w-md">
                <h3 className="font-semibold text-foreground mb-4">Selected Files</h3>
                <div className="space-y-2 mb-6">
                  {selectedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <File className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleUpload}
                    disabled={isLoading}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isLoading ? "Uploading..." : "Upload Documents"}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedFiles([])
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
