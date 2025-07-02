"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"

interface UploadDropzoneProps {
  onUploaded: (url: string) => void
  maxSize?: number
  accept?: Record<string, string[]>
}

export default function UploadDropzone({
  onUploaded,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
}: UploadDropzoneProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true)
      setError(null)
      setUploadProgress(0)

      // Get presigned URL
      const signResponse = await fetch("/api/sign-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      })

      if (!signResponse.ok) {
        throw new Error("Failed to get upload URL")
      }

      const { uploadUrl, publicUrl } = await signResponse.json()

      // Upload file with progress tracking
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(progress)
        }
      })

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          setUploadProgress(100)
          onUploaded(publicUrl)
          setTimeout(() => {
            setIsUploading(false)
          }, 500)
        } else {
          throw new Error("Upload failed")
        }
      })

      xhr.addEventListener("error", () => {
        throw new Error("Upload failed")
      })

      xhr.open("PUT", uploadUrl)
      xhr.setRequestHeader("Content-Type", file.type)
      xhr.send(file)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      // Validate file size
      if (file.size > maxSize) {
        setError(`파일 크기가 너무 큽니다. 최대 ${Math.round(maxSize / 1024 / 1024)}MB까지 업로드 가능합니다.`)
        return
      }

      // Create preview
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
      setUploadedFile(file)

      // Start upload
      await uploadFile(file)
    },
    [maxSize, onUploaded],
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize,
  })

  const removeFile = () => {
    setUploadedFile(null)
    setPreviewUrl(null)
    setError(null)
    setUploadProgress(0)
    setIsUploading(false)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!uploadedFile ? (
        <Card
          {...getRootProps()}
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            isDragActive ? "border-purple-500 bg-purple-50" : "border-gray-300"
          } ${error ? "border-red-500" : ""}`}
        >
          <CardContent className="p-8 text-center">
            <input {...getInputProps()} />

            <div className="mb-4">
              <Upload className={`h-12 w-12 mx-auto ${isDragActive ? "text-purple-500" : "text-gray-400"}`} />
            </div>

            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                {isDragActive ? "파일을 여기에 놓으세요" : "반려동물 사진을 업로드하세요"}
              </p>
              <p className="text-sm text-gray-500">PNG, JPG, JPEG, WebP 파일 (최대 5MB)</p>
              <Button variant="outline" className="mt-4 bg-transparent">
                파일 선택하기
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              {previewUrl && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.name}</p>
                  <Button variant="ghost" size="sm" onClick={removeFile} disabled={isUploading}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mb-3">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>

                {isUploading && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-gray-500">업로드 중... {uploadProgress}%</p>
                  </div>
                )}

                {!isUploading && uploadProgress === 100 && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">업로드 완료</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {fileRejections.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{fileRejections[0].errors[0].message}</span>
          </div>
        </div>
      )}
    </div>
  )
}
