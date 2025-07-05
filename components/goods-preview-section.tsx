"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCcw, ZoomIn, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"

const REWARD_TIERS = [
  {
    id: "basic",
    price: "10,000원",
    title: "디지털 캐릭터",
    description: "고해상도 PNG 이미지 4장",
    items: ["4가지 스타일 캐릭터 이미지", "고해상도 PNG (2048x2048)", "상업적 이용 가능"],
    popular: false,
  },
  {
    id: "premium",
    price: "30,000원",
    title: "캐릭터 + 머그컵",
    description: "디지털 이미지 + 커스텀 머그컵",
    items: ["디지털 캐릭터 이미지 4장", "커스텀 머그컵 1개", "무료 배송"],
    popular: true,
  },
  {
    id: "deluxe",
    price: "70,000원",
    title: "풀 패키지",
    description: "디지털 + 티셔츠 + 액자 세트",
    items: ["디지털 캐릭터 이미지 4장", "커스텀 티셔츠 1장", "캔버스 액자 1개", "무료 배송", "3D 모델 파일"],
    popular: false,
  },
]

const PRODUCT_PREVIEWS = {
  basic: {
    type: "digital",
    image: "/placeholder.svg?height=300&width=300",
    title: "디지털 캐릭터 이미지",
  },
  premium: {
    type: "mug",
    image: "/placeholder.svg?height=300&width=300",
    title: "커스텀 머그컵",
  },
  deluxe: {
    type: "bundle",
    image: "/placeholder.svg?height=300&width=300",
    title: "풀 패키지 세트",
  },
}

export function GoodsPreviewSection() {
  const [selectedTier, setSelectedTier] = useState("premium")
  const [isRotating, setIsRotating] = useState(false)

  const handleRotate = () => {
    setIsRotating(true)
    setTimeout(() => setIsRotating(false), 1000)
  }

  const selectedReward = REWARD_TIERS.find((tier) => tier.id === selectedTier)
  const selectedPreview = PRODUCT_PREVIEWS[selectedTier as keyof typeof PRODUCT_PREVIEWS]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            굿즈 미리보기
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            내 캐릭터로 만든 굿즈를 미리 확인해보세요
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            리워드 옵션을 선택하면 실제로 받게 될 상품을 3D로 미리 볼 수 있어요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Reward Selection */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">리워드 선택</h3>

            {REWARD_TIERS.map((tier) => (
              <Card
                key={tier.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedTier === tier.id ? "ring-2 ring-purple-500 shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{tier.title}</h4>
                        {tier.popular && <Badge className="bg-gradient-to-r from-pink-500 to-purple-500">인기</Badge>}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{tier.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{tier.price}</div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {tier.items.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right: Product Preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">상품 미리보기</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRotate} disabled={isRotating}>
                  <RotateCcw className={`w-4 h-4 mr-2 ${isRotating ? "animate-spin" : ""}`} />
                  회전
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomIn className="w-4 h-4 mr-2" />
                  확대
                </Button>
              </div>
            </div>

            {/* 3D Preview Area */}
            <Card className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
              <CardContent className="p-8 h-full flex items-center justify-center">
                <div className={`relative transition-transform duration-1000 ${isRotating ? "rotate-360" : ""}`}>
                  <Image
                    src={selectedPreview.image || "/placeholder.svg"}
                    alt={selectedPreview.title}
                    width={300}
                    height={300}
                    className="object-contain"
                  />

                  {/* 3D Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 rounded-lg"></div>
                </div>
              </CardContent>
            </Card>

            {/* Product Info */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{selectedPreview.title}</h4>
                <p className="text-gray-600 mb-4">{selectedReward?.description}</p>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    지금 후원하기
                  </Button>
                  <Button variant="outline">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Options */}
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors">색상</TabsTrigger>
                <TabsTrigger value="sizes">사이즈</TabsTrigger>
                <TabsTrigger value="materials">소재</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="mt-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded-full cursor-pointer"></div>
                  <div className="w-8 h-8 bg-black rounded-full cursor-pointer"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer"></div>
                  <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"></div>
                </div>
              </TabsContent>

              <TabsContent value="sizes" className="mt-4">
                <div className="flex gap-2">
                  <Badge variant="outline" className="cursor-pointer">
                    S
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    M
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    L
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    XL
                  </Badge>
                </div>
              </TabsContent>

              <TabsContent value="materials" className="mt-4">
                <p className="text-sm text-gray-600">고품질 면 100% 소재로 제작되며, 친환경 잉크를 사용합니다.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
