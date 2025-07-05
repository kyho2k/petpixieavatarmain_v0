"use client"

import { useLiveStats } from "@/hooks/use-live-stats"
import { TrendingUp, Users, Clock } from "lucide-react"

export function LiveStatsBanner() {
  const { stats, isLoading } = useLiveStats()

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <div className="text-sm">통계 로딩 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>펀딩 진행률: 76%</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>오늘 생성: {stats.todayGenerated}건</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>평균 처리: {stats.averageTime}초</span>
          </div>
        </div>
      </div>
    </div>
  )
}
