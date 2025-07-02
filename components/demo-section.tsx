"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Clock, Zap } from "lucide-react"
import Image from "next/image"

interface DemoSectionProps {
  onImageGenerated: (images: string[]) => void
  onSampleSelected: (sample: string) => void
}

export default function DemoSection({ onImageGenerated, onSampleSelected }: DemoSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [selectedSample, setSelectedSample] = useState<string | null>(null)

  const sampleImages = [
    {
      id: "1",
      src: "/placeholder.svg?height=200&width=200",
      title: "골든 리트리버",
      description: "활발하고 친근한",
    },
    {
      id: "2",
      src: "/placeholder.svg?height=200&width=200",
      title: "페르시안 고양이",
      description: "우아하고 고급스러운",
    },
    {
      id: "3",
      src: "/placeholder.svg?height=200&width=200",
      title: "비글",
      description: "호기심 많은",
    },
    {
      id: "4",
      src: "/placeholder.svg?height=200&width=200",
      title: "러시안 블루",
      description: "신비로운",
    },
    {
      id: "5",
      src: "/placeholder.svg?height=200&width=200",
      title: "시바견",
      description: "당당하고 독립적인",
    },
    {
      id: "6",
      src: "/placeholder.svg?height=200&width=200",
      title: "메인쿤",
      description: "거대하고 온순한",
    },
  ]

  const generateImages = async (sampleId: string) => {
    const sample = sampleImages.find((img) => img.id === sampleId)
    if (!sample) return

    setSelectedSample(sample.src)
    onSampleSelected(sample.src)
    setIsGenerating(true)
    setProgress(0)
    setTimeRemaining(60)

    // Simulate AI generation process
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (Math.random() * 15 + 5)
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsGenerating(false)

          // Generate mock result images
          const mockResults = [
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
          ]
          onImageGenerated(mockResults)

          return 100
        }
        return newProgress
      })

      setTimeRemaining((prev) => Math.max(0, prev - 3))
    }, 1000)

    return () => clearInterval(interval)
  }

  return (
    <div className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800">
            <Zap className="h-4 w-4 mr-2" />
            1분 체험
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">지금 바로 AI 마법을 경험해보세요</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            샘플 이미지를 선택하면 AI가 즉시 판타지 캐릭터로 변환해드립니다. 평균 58초면 완성됩니다!
          </p>
        </div>

        {/* Sample Images Grid */}
        {!isGenerating && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {sampleImages.map((image) => (
              <Card
                key={image.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                onClick={() => generateImages(image.id)}
              >
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 rounded-lg transition-colors flex items-center justify-center">
                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-purple-600 hover:bg-purple-50"
                      >
                        <Sparkles className="h-4 w-4 mr-1" />
                        체험하기
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900">{image.title}</h3>
                  <p className="text-xs text-gray-500">{image.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Generation Progress */}
        {isGenerating && (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI가 열심히 그림 그리는 중...</h3>
                <p className="text-gray-600">마법 같은 변신이 곧 완성됩니다!</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">진행률</span>
                  <span className="text-sm font-medium text-purple-600">{Math.round(progress)}%</span>
                </div>

                <Progress value={progress} className="h-3" />

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>약 {timeRemaining}초 남음</span>
                </div>

                {/* Generation Steps */}
                <div className="grid grid-cols-4 gap-2 mt-6">
                  {[
                    { step: 1, label: "이미지 분석", icon: "🔍" },
                    { step: 2, label: "AI 학습", icon: "🧠" },
                    { step: 3, label: "스타일 적용", icon: "🎨" },
                    { step: 4, label: "최종 완성", icon: "✨" },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className={`text-center p-2 rounded-lg transition-colors ${
                        progress >= (item.step * 25) ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <div className="text-lg mb-1">{item.icon}</div>
                      <div className="text-xs font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Fun Facts During Loading */}
        {isGenerating && (
          <div className="mt-8 text-center">
            <div className="max-w-md mx-auto bg-white/50 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-gray-600">
                💡 <strong>재미있는 사실:</strong> AI는 수천 장의 판타지 아트를 학습하여 여러분의 반려동물을 마법 같은
                캐릭터로 변환합니다!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
