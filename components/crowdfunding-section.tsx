"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Users, Clock, Gift, Star, ExternalLink, Check, Coffee, Shirt, ImageIcon } from "lucide-react"

export default function CrowdfundingSection() {
  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  const [fundingProgress] = useState(85)
  const [backers] = useState(127)
  const [daysLeft] = useState(12)
  const [currentAmount] = useState(4250000)
  const [targetAmount] = useState(5000000)

  const rewards = [
    {
      id: 1,
      price: 10000,
      title: "디지털 아바타 패키지",
      description: "AI 생성 펫 아바타 4장 (고해상도 PNG)",
      items: ["4장의 고해상도 AI 아바타 이미지", "웹용 최적화 버전 포함", "상업적 이용 가능", "이메일로 전달"],
      popular: false,
      estimated: "펀딩 종료 후 1주일",
      backers: 45,
      icon: ImageIcon,
      preview: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      price: 30000,
      title: "프리미엄 굿즈 세트",
      description: "고해상도 이미지 + 머그컵",
      items: [
        "디지털 아바타 패키지 포함",
        "프리미엄 세라믹 머그컵 1개",
        "고품질 프린팅",
        "전국 무료배송",
        "선물용 포장",
      ],
      popular: true,
      estimated: "펀딩 종료 후 3주일",
      backers: 67,
      icon: Coffee,
      preview: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      price: 70000,
      title: "컴플리트 컬렉션",
      description: "티셔츠 + 캔버스 액자 세트",
      items: [
        "프리미엄 굿즈 세트 포함",
        "프리미엄 티셔츠 1벌 (사이즈 선택)",
        "캔버스 액자 (A4 사이즈)",
        "스티커 세트 5장",
        "한정판 감사 카드",
        "우선 배송",
      ],
      popular: false,
      estimated: "펀딩 종료 후 4주일",
      backers: 15,
      icon: Shirt,
      preview: "/placeholder.svg?height=200&width=200",
    },
  ]

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR")
  }

  const handleFundingClick = (rewardId: number) => {
    // 실제로는 와디즈/텀블벅 페이지로 리다이렉트
    window.open(`https://wadiz.kr/web/campaign/detail/123456?reward=${rewardId}`, "_blank")
  }

  return (
    <div className="py-20 bg-gradient-to-b from-purple-600 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            <Heart className="h-4 w-4 mr-2" />
            크라우드펀딩
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">함께 만들어가는 특별한 프로젝트</h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            여러분의 후원으로 더 많은 반려동물 가족들이 AI 아바타의 마법을 경험할 수 있습니다
          </p>
        </div>

        {/* Funding Progress */}
        <div className="mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{fundingProgress}%</div>
                  <div className="text-purple-100">달성률</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{formatPrice(currentAmount)}원</div>
                  <div className="text-purple-100">현재 모금액</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{backers}명</div>
                  <div className="text-purple-100">후원자</div>
                </div>
              </div>

              <Progress value={fundingProgress} className="h-4 mb-4 bg-white/20" />

              <div className="flex justify-between items-center text-sm text-purple-100">
                <span>목표: {formatPrice(targetAmount)}원</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{daysLeft}일 남음</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-white/20 rounded-full border-2 border-white"></div>
              ))}
            </div>
            <span className="text-purple-100">+{backers - 5}명</span>
          </div>
          <p className="text-purple-100">
            <strong className="text-white">김민수님</strong>을 포함한{" "}
            <strong className="text-white">{backers}명</strong>이 후원에 참여했어요!
          </p>
        </div>

        {/* Reward Tiers */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12">리워드 미리 체험하기</h3>

          <div className="grid lg:grid-cols-3 gap-8">
            {rewards.map((reward) => {
              const Icon = reward.icon
              return (
                <Card
                  key={reward.id}
                  className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedReward === reward.id
                      ? "ring-4 ring-white bg-white text-gray-900"
                      : "bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  } ${reward.popular ? "border-yellow-400 border-2" : ""}`}
                  onClick={() => setSelectedReward(reward.id)}
                >
                  {reward.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-yellow-400 text-yellow-900">
                        <Star className="h-3 w-3 mr-1" />
                        인기
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-6">
                    {/* Preview Image */}
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
                        <Icon className="h-8 w-8" />
                      </div>
                      <img
                        src={reward.preview || "/placeholder.svg"}
                        alt={reward.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Price */}
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold mb-1">{formatPrice(reward.price)}원</div>
                      <div className="text-sm opacity-80">{reward.backers}명 선택</div>
                    </div>

                    {/* Title & Description */}
                    <div className="text-center mb-6">
                      <h4 className="font-semibold text-lg mb-2">{reward.title}</h4>
                      <p className="text-sm opacity-80">{reward.description}</p>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2 mb-6">
                      {reward.items.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Estimated Delivery */}
                    <div className="text-xs opacity-60 mb-4 text-center">예상 전달: {reward.estimated}</div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full ${
                        selectedReward === reward.id
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "bg-white text-purple-600 hover:bg-gray-100"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleFundingClick(reward.id)
                      }}
                    >
                      <Gift className="h-4 w-4 mr-2" />이 리워드 선택
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">지금 와디즈에서 펀딩 참여하기</h3>
            <p className="text-purple-100 mb-6">얼리버드 혜택은 한정수량입니다. 놓치기 전에 지금 바로 참여해보세요!</p>

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                onClick={() => window.open("https://wadiz.kr/web/campaign/detail/123456", "_blank")}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                와디즈에서 펀딩하기
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
                onClick={() => window.open("https://tumblbug.com/project/123456", "_blank")}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                텀블벅에서 펀딩하기
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                펀딩 참여 방법
              </h4>
              <div className="space-y-2 text-sm text-purple-100">
                <p>1. 원하는 리워드를 선택하세요</p>
                <p>2. 와디즈/텀블벅에서 결제를 진행하세요</p>
                <p>3. 펀딩 종료 후 제작이 시작됩니다</p>
                <p>4. 완성된 굿즈를 받아보세요!</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                펀딩 혜택
              </h4>
              <div className="space-y-2 text-sm text-purple-100">
                <p>• 정가 대비 최대 40% 할인</p>
                <p>• 한정판 굿즈 우선 제공</p>
                <p>• 전국 무료배송</p>
                <p>• 펀딩 실패 시 100% 환불</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs text-purple-200 max-w-3xl mx-auto">
            * 펀딩 종료 시 결제가 진행되며, 리워드 제작이 시작됩니다. * 예상 전달일은 제작 상황에 따라 변경될 수
            있습니다. * 펀딩 목표 달성 실패 시 결제가 진행되지 않습니다.
          </p>
        </div>
      </div>
    </div>
  )
}
