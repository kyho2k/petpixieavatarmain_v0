"use client"

import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Users, Target } from "lucide-react"
import { useLiveStats } from "@/hooks/use-live-stats"

export default function LiveStatsBanner() {
  const { stats, isLoading } = useLiveStats()

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="animate-pulse">통계 로딩 중...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <TrendingUp className="h-3 w-3 mr-1" />
            오늘 {stats.todayGenerations}개 아바타 생성
          </Badge>

          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <Clock className="h-3 w-3 mr-1" />
            평균 {stats.averageProcessingTime}초 처리
          </Badge>

          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <Users className="h-3 w-3 mr-1" />
            만족도 {stats.satisfactionRate}%
          </Badge>

          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <Target className="h-3 w-3 mr-1" />
            펀딩 {stats.fundingProgress}% 달성 · {stats.daysLeft}일 남음
          </Badge>
        </div>
      </div>
    </div>
  )
}
