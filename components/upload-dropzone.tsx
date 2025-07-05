"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, ImageIcon, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadDropzoneProps {
  onImageUpload: (imageUrl: string) => void
}

export function UploadDropzone({ onImageUpload }: UploadDropzoneProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setIsUploading(true)
      setError(null)

      try {
        // Create a local URL for preview
        const imageUrl = URL.createObjectURL(file)

        // In a real app, you would upload to a cloud storage service
        // For demo purposes, we'll use the local URL
        onImageUpload(imageUrl)
      } catch (err) {
        setError("파일 업로드 중 오류가 발생했습니다.")
        console.error("Upload error:", err)
      } finally {
        setIsUploading(false)
      }
    },
    [onImageUpload],
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: isUploading,
  })

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-purple-400",
        isDragActive && !isDragReject && "border-purple-500 bg-purple-50",
        isDragReject && "border-red-500 bg-red-50",
        isUploading && "cursor-not-allowed opacity-50",
      )}
    >
      <input {...getInputProps()} />
      <div className="p-8 text-center">
        {isUploading ? (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-gray-600">업로드 중...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <ImageIcon className="w-6 h-6 text-purple-600" />
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                {isDragActive ? "파일을 여기에 놓으세요" : "반려동물 사진 업로드"}
              </h3>
              <p className="text-gray-600 text-sm mb-4">드래그 앤 드롭하거나 클릭해서 파일을 선택하세요</p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
            >
              <Upload className="w-4 h-4 mr-2" />
              파일 선택
            </Button>

            <div className="text-xs text-gray-500 space-y-1">
              <p>지원 형식: JPG, PNG, WEBP</p>
              <p>최대 크기: 10MB</p>
              <p>권장: 정면을 바라보는 선명한 사진</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>
    </Card>
  )
}
