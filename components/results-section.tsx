"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Share2, RotateCcw, Maximize2, Heart } from "lucide-react"
import Image from "next/image"

interface ResultsSectionProps {
  images: string[]
  model3D: string | null
}

export function ResultsSection({ images, model3D }: ResultsSectionProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [rotation, setRotation] = useState(0)

  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `pet-avatar-${index + 1}.png`
    link.click()
  }

  const handleShare = async (imageUrl: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "내 반려동물 AI 아바타",
          text: "AI로 만든 우리 아이 아바타를 확인해보세요!",
          url: window.location.href,
        })
      } catch (err) {
        console.log("Share failed:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 클립보드에 복사되었습니다!")
    }
  }

  return (
    <div className="space-y-6">
      {/* Success Badge */}
      <div className="text-center">
        <Badge variant="secondary" className="bg-green-100 text-green-700 px-4 py-2">
          <Heart className="w-4 h-4 mr-2" />
          생성 완료!
        </Badge>
      </div>

      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="images">캐릭터 이미지</TabsTrigger>
          <TabsTrigger value="3d">3D 모델</TabsTrigger>
        </TabsList>

        <TabsContent value="images" className="space-y-4">
          {/* Main Image Display */}
          <Card>
            <CardContent className="p-4">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
                {images[selectedImage] && (
                  <Image
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={`Generated avatar ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownload(images[selectedImage], selectedImage)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleShare(images[selectedImage])}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-purple-500 ring-2 ring-purple-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Avatar style ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Style Labels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
            <Badge variant="outline">디즈니 스타일</Badge>
            <Badge variant="outline">애니메이션 스타일</Badge>
            <Badge variant="outline">카툰 스타일</Badge>
            <Badge variant="outline">픽셀아트 스타일</Badge>
          </div>
        </TabsContent>

        <TabsContent value="3d" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                3D 모델 뷰어
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setRotation(rotation + 90)}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                {model3D ? (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* 3D Model Viewer would go here */}
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-4xl">🐕</span>
                      </div>
                      <p className="text-gray-600">3D 모델 (360° 회전 가능)</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p>3D 모델을 불러오는 중...</p>
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">회전</span>
                  <span className="text-sm font-mono">{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>팁:</strong> 마우스로 드래그하여 3D 모델을 자유롭게 회전시킬 수 있어요!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Download className="w-4 h-4 mr-2" />
          모든 이미지 다운로드
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Share2 className="w-4 h-4 mr-2" />
          결과 공유하기
        </Button>
      </div>
    </div>
  )
}
