"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Heart, Sparkles, Grid3X3 } from "lucide-react"
import Image from "next/image"

interface ResultsSectionProps {
  images: string[]
}

export default function ResultsSection({ images }: ResultsSectionProps) {
  const [visibleImages, setVisibleImages] = useState<string[]>([])
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (images.length === 0) return

    // Animate images appearing one by one
    const timer = setTimeout(() => {
      images.forEach((image, index) => {
        setTimeout(() => {
          setVisibleImages((prev) => [...prev, image])

          // Show confetti when all images are loaded
          if (index === images.length - 1) {
            setTimeout(() => setShowConfetti(true), 500)
          }
        }, index * 800)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [images])

  const toggleLike = (index: number) => {
    setLikedImages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `pet-avatar-${index + 1}.png`
    link.click()
  }

  const shareImage = (imageUrl: string) => {
    if (navigator.share) {
      navigator.share({
        title: "AI로 만든 내 펫 아바타",
        text: "PetPixie로 만든 우리 아이의 판타지 캐릭터를 확인해보세요!",
        url: window.location.href,
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 복사되었습니다!")
    }
  }

  const downloadCollage = () => {
    // Create a canvas to combine images
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 600
    canvas.height = 600

    // Simple 2x2 grid layout
    const imageSize = 280
    const gap = 20
    const positions = [
      { x: gap, y: gap },
      { x: gap + imageSize + gap, y: gap },
      { x: gap, y: gap + imageSize + gap },
      { x: gap + imageSize + gap, y: gap + imageSize + gap },
    ]

    Promise.all(
      images.slice(0, 4).map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            const pos = positions[index]
            ctx.drawImage(img, pos.x, pos.y, imageSize, imageSize)
            resolve()
          }
          img.src = src
        })
      }),
    ).then(() => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = "pet-avatar-collage.png"
          link.click()
          URL.revokeObjectURL(url)
        }
      })
    })
  }

  if (visibleImages.length === 0) return null

  return (
    <div className="py-20 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">
            <Sparkles className="h-4 w-4 mr-2" />
            완성!
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🎉 마법 같은 변신 완료!</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI가 만든 판타지 캐릭터들을 확인해보세요. 마음에 드는 이미지를 다운로드하거나 친구들과 공유해보세요!
          </p>
        </div>

        {/* Results Grid - Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {visibleImages.map((image, index) => (
            <Card
              key={index}
              className="break-inside-avoid hover:shadow-xl transition-all duration-300 group animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Generated avatar ${index + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-t-lg"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-lg">
                    <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => toggleLike(index)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedImages.has(index) ? "text-red-500 fill-current" : "text-gray-600"
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        스타일 #{index + 1}
                      </Badge>
                      {likedImages.has(index) && <Heart className="h-4 w-4 text-red-500 fill-current" />}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => downloadImage(image, index)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => shareImage(image)}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        {visibleImages.length === images.length && (
          <div className="text-center mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={downloadCollage} className="bg-purple-600 hover:bg-purple-700">
                <Grid3X3 className="h-5 w-5 mr-2" />
                콜라주로 다운로드
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => shareImage(images[0])}
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Share2 className="h-5 w-5 mr-2" />
                SNS에 공유하기
              </Button>
            </div>

            <p className="text-sm text-gray-500">💡 인스타그램용 1:1 비율 콜라주도 자동으로 생성됩니다</p>
          </div>
        )}

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-gray-600 mb-4">
              <strong>1,247명</strong>이 이미 AI 펫 아바타를 만들었어요!
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div>
                <div className="font-semibold text-purple-600">평균 4.8/5</div>
                <div className="text-gray-500">만족도</div>
              </div>
              <div>
                <div className="font-semibold text-pink-600">89%</div>
                <div className="text-gray-500">재이용 의향</div>
              </div>
              <div>
                <div className="font-semibold text-blue-600">2.3배</div>
                <div className="text-gray-500">SNS 공유율</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
