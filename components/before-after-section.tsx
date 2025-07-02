"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, Sparkles } from "lucide-react"
import Image from "next/image"

interface BeforeAfterSectionProps {
  originalImage: string | null
  generatedImage: string | null
}

export default function BeforeAfterSection({ originalImage, generatedImage }: BeforeAfterSectionProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging])

  if (!originalImage || !generatedImage) return null

  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Before & After
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">놀라운 변화를 직접 확인해보세요</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            슬라이더를 좌우로 드래그하여 원본 사진과 AI가 만든 판타지 캐릭터를 비교해보세요
          </p>
        </div>

        {/* Before/After Slider */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div
                ref={containerRef}
                className="relative w-full h-96 md:h-[500px] cursor-col-resize select-none"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseUp={handleMouseUp}
                onTouchEnd={handleMouseUp}
              >
                {/* Before Image (Original) */}
                <div className="absolute inset-0">
                  <Image
                    src={originalImage || "/placeholder.svg"}
                    alt="Original pet photo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gray-800/80 text-white">원본</Badge>
                  </div>
                </div>

                {/* After Image (Generated) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <Image
                    src={generatedImage || "/placeholder.svg"}
                    alt="AI generated avatar"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-purple-600 text-white">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI 결과
                    </Badge>
                  </div>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize z-10"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-col-resize"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                  >
                    <ArrowLeftRight className="h-4 w-4 text-gray-600" />
                  </div>
                </div>

                {/* Instruction Overlay */}
                {sliderPosition === 50 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm animate-pulse">
                      ← 드래그하여 비교해보세요 →
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Comparison Stats */}
          <div className="mt-8 grid grid-cols-2 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">원본 사진</h3>
              <p className="text-gray-600">실제 반려동물의 모습</p>
              <div className="mt-3 text-sm text-gray-500">📸 일반 사진</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI 아바타</h3>
              <p className="text-gray-600">판타지 캐릭터로 변환</p>
              <div className="mt-3 text-sm text-purple-600">✨ AI 생성 아트</div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-blue-900 mb-2">💡 AI 기술의 놀라운 점</h4>
            <p className="text-blue-800 text-sm">
              AI는 반려동물의 특징을 분석하여 눈 색깔, 털 패턴, 얼굴 형태 등을 판타지 스타일로 자연스럽게 변환합니다.
              각각의 결과물은 고유하며, 원본의 개성을 그대로 유지합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
