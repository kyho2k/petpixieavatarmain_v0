"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Users, Calendar, Target, TrendingUp, Share2 } from "lucide-react"

interface FundingStats {
  currentAmount: number
  targetAmount: number
  backers: number
  daysLeft: number
  achievementRate: number
}

export function CrowdfundingSection() {
  const [fundingStats, setFundingStats] = useState<FundingStats>({
    currentAmount: 3800000,
    targetAmount: 5000000,
    backers: 127,
    daysLeft: 18,
    achievementRate: 76,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFundingStats((prev) => ({
        ...prev,
        currentAmount: prev.currentAmount + Math.floor(Math.random() * 10000),
        backers: prev.backers + Math.floor(Math.random() * 2),
        achievementRate: Math.min(100, (prev.currentAmount / prev.targetAmount) * 100),
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500">크라우드펀딩 진행중</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            지금 참여하고 특별한 리워드를 받아보세요!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            얼리버드 후원자들을 위한 특별 혜택이 준비되어 있습니다
          </p>
        </div>

        {/* Funding Progress Card */}
        <Card className="max-w-4xl mx-auto mb-12 shadow-xl">
          <CardContent className="p-8">
            {/* Progress Header */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-gray-900 mb-2">{fundingStats.achievementRate}% 달성</div>
              <Progress value={fundingStats.achievementRate} className="h-4 mb-4" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(fundingStats.currentAmount)}원
                  </div>
                  <div className="text-sm text-gray-600">현재 모금액</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">{fundingStats.backers}명</div>
                  <div className="text-sm text-gray-600">후원자</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{fundingStats.daysLeft}일</div>
                  <div className="text-sm text-gray-600">남음</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                텀블벅에서 후원하기
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 bg-transparent">
                <Share2 className="w-5 h-5 mr-2" />
                친구에게 공유하기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">
                목표 {formatCurrency(fundingStats.targetAmount)}원
              </div>
              <div className="text-sm text-gray-600">펀딩 목표</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">
                평균 {formatCurrency(Math.floor(fundingStats.currentAmount / fundingStats.backers))}원
              </div>
              <div className="text-sm text-gray-600">후원 금액</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">일일 평균 12명</div>
              <div className="text-sm text-gray-600">신규 후원자</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">2024년 3월</div>
              <div className="text-sm text-gray-600">예상 배송</div>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">비슷한 프로젝트 성공 사례</h3>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">145%</div>
                <div className="text-sm text-gray-600 mb-2">달성률</div>
                <div className="text-sm font-medium">반려동물 캘린더 프로젝트</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">230%</div>
                <div className="text-sm text-gray-600 mb-2">달성률</div>
                <div className="text-sm font-medium">펫 초상화 서비스</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">189%</div>
                <div className="text-sm text-gray-600 mb-2">달성률</div>
                <div className="text-sm font-medium">AI 펫 굿즈 제작</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
