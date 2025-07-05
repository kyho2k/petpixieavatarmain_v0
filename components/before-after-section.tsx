"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Download, Share2 } from "lucide-react"
import Image from "next/image"

interface BeforeAfterSectionProps {
  originalImage?: string | null
  generatedImage?: string | null
}

export default function BeforeAfterSection({ originalImage, generatedImage }: BeforeAfterSectionProps) {
  const [showComparison, setShowComparison] = useState(false)

  if (!originalImage || !generatedImage) return null

  return (
    <div className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800">
            <RotateCcw className="h-4 w-4 mr-2" />
            변환 비교
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">놀라운 변화를 확인해보세요! ✨</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            원본 사진과 AI가 생성한 캐릭터를 비교해보며 변환의 품질을 확인하세요
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Original Image */}
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-square bg-gray-100">
                    <Image src={originalImage || "/placeholder.svg"} alt="원본 사진" fill className="object-cover" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-100 text-blue-800">원본 사진</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">📸 업로드한 사진</h3>
                  <p className="text-gray-600 text-sm">AI 분석을 위해 업로드된 원본 이미지</p>
                </div>
              </CardContent>
            </Card>

            {/* Generated Image */}
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100">
                    <Image
                      src={generatedImage || "/placeholder.svg"}
                      alt="생성된 캐릭터"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-100 text-green-800">AI 생성</Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">🎨 AI 캐릭터</h3>
                  <p className="text-gray-600 text-sm">LightX AI가 생성한 캐릭터 이미지</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Stats */}
          <div className="bg-white rounded-xl p-8 shadow-lg border">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">변환 품질 분석</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">특징 보존도</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 mb-1">4.8/5</div>
                <div className="text-sm text-gray-600">사용자 만족도</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">47초</div>
                <div className="text-sm text-gray-600">처리 시간</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">2048px</div>
                <div className="text-sm text-gray-600">출력 해상도</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                다른 스타일로 재생성
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
              >
                3D 모델 확인하기
              </Button>
            </div>
            <p className="text-sm text-gray-500">💡 더 많은 스타일과 3D 모델을 확인해보세요</p>
          </div>
        </div>
      </div>
    </div>
  )
}
