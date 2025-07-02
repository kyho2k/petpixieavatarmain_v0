"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Upload, Zap, Clock } from "lucide-react"
import Image from "next/image"
import UploadDropzone from "./upload-dropzone"
import { useGeneration } from "@/hooks/use-generation"

interface DemoSectionProps {
  onImageGenerated: (images: string[]) => void
  onSampleSelected: (sample: string) => void
}

export default function DemoSection({ onImageGenerated, onSampleSelected }: DemoSectionProps) {
  const [selectedMode, setSelectedMode] = useState<"sample" | "upload">("sample")
  const [selectedSample, setSelectedSample] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const { status, progress, images, error, estimatedTime, startGeneration, reset, isGenerating } = useGeneration()

  const sampleImages = [
    {
      id: "dog1",
      src: "/placeholder.svg?height=200&width=200",
      alt: "골든 리트리버",
      label: "골든 리트리버",
    },
    {
      id: "dog2",
      src: "/placeholder.svg?height=200&width=200",
      alt: "시바견",
      label: "시바견",
    },
    {
      id: "cat1",
      src: "/placeholder.svg?height=200&width=200",
      alt: "페르시안 고양이",
      label: "페르시안 고양이",
    },
    {
      id: "cat2",
      src: "/placeholder.svg?height=200&width=200",
      alt: "러시안 블루",
      label: "러시안 블루",
    },
    {
      id: "dog3",
      src: "/placeholder.svg?height=200&width=200",
      alt: "푸들",
      label: "푸들",
    },
    {
      id: "cat3",
      src: "/placeholder.svg?height=200&width=200",
      alt: "메인쿤",
      label: "메인쿤",
    },
  ]

  const handleSampleSelect = async (sample: any) => {
    setSelectedSample(sample.src)
    onSampleSelected(sample.src)
    await startGeneration(sample.src)
  }

  const handleUploadComplete = async (url: string) => {
    setUploadedImage(url)
    await startGeneration(url)
  }

  const getProgressMessage = () => {
    if (progress < 20) return "AI가 이미지를 분석하고 있어요..."
    if (progress < 40) return "캐릭터 스타일을 결정하고 있어요..."
    if (progress < 60) return "판타지 요소를 추가하고 있어요..."
    if (progress < 80) return "세부 디테일을 그리고 있어요..."
    if (progress < 95) return "마지막 터치를 하고 있어요..."
    return "곧 완성됩니다!"
  }

  // Trigger callback when generation completes
  if (status === "succeeded" && images.length > 0) {
    onImageGenerated(images)
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <Zap className="h-4 w-4 mr-2" />
            1분 체험
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🎨 AI 마법을 직접 체험해보세요</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            샘플 이미지로 빠른 체험하거나, 직접 반려동물 사진을 업로드해서 나만의 판타지 캐릭터를 만들어보세요
          </p>
        </div>

        {/* Mode Selection */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg">
            <Button
              variant={selectedMode === "sample" ? "default" : "ghost"}
              onClick={() => setSelectedMode("sample")}
              className="px-6"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              샘플로 체험
            </Button>
            <Button
              variant={selectedMode === "upload" ? "default" : "ghost"}
              onClick={() => setSelectedMode("upload")}
              className="px-6"
            >
              <Upload className="h-4 w-4 mr-2" />내 사진 업로드
            </Button>
          </div>
        </div>

        {/* Content based on selected mode */}
        {selectedMode === "sample" ? (
          <div>
            <h3 className="text-xl font-semibold text-center mb-8">마음에 드는 샘플을 선택해주세요</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {sampleImages.map((sample) => (
                <Card
                  key={sample.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    selectedSample === sample.src ? "ring-2 ring-purple-500" : ""
                  } ${isGenerating ? "pointer-events-none opacity-50" : ""}`}
                  onClick={() => !isGenerating && handleSampleSelect(sample)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                      <Image src={sample.src || "/placeholder.svg"} alt={sample.alt} fill className="object-cover" />
                    </div>
                    <p className="text-sm font-medium text-center text-gray-700">{sample.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <UploadDropzone onUploaded={handleUploadComplete} />
          </div>
        )}

        {/* Generation Progress */}
        {isGenerating && (
          <div className="max-w-2xl mx-auto mt-12">
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-purple-600 animate-spin" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI가 열심히 그림을 그리고 있어요!</h3>
                  <p className="text-gray-600">{getProgressMessage()}</p>
                </div>

                <div className="space-y-4">
                  <Progress value={progress} className="h-3" />

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">진행률: {progress}%</span>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>약 {Math.max(0, Math.ceil(((100 - progress) * estimatedTime) / 100))}초 남음</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    💡 잠깐! 생성되는 동안 아래로 스크롤해서 굿즈 미리보기를 확인해보세요
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto mt-8">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6 text-center">
                <div className="text-red-600 mb-4">
                  <span className="text-2xl">😅</span>
                </div>
                <h3 className="font-semibold text-red-900 mb-2">앗, 문제가 발생했어요</h3>
                <p className="text-red-700 text-sm mb-4">{error}</p>
                <Button onClick={reset} variant="outline" className="border-red-300 text-red-700 bg-transparent">
                  다시 시도하기
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Success State */}
        {status === "succeeded" && images.length > 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">완성! 아래에서 결과를 확인해보세요 ✨</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
