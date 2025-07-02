"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Cpu, ImageIcon, Printer, ArrowRight, ExternalLink, TrendingUp, Users, Calendar } from "lucide-react"

export default function TechInfoSection() {
  const [activeStep, setActiveStep] = useState(0)

  const pipeline = [
    {
      icon: Camera,
      title: "사진 업로드",
      description: "반려동물 사진을 업로드하면 AI가 자동으로 분석을 시작합니다",
      details: "고해상도 이미지 처리 및 얼굴 인식 기술 적용",
      color: "bg-blue-500",
    },
    {
      icon: Cpu,
      title: "AI 학습 & 분석",
      description: "5단계 딥러닝 프로세스를 통해 반려동물의 특징을 학습합니다",
      details: "Replicate fofr/consistent-character 모델 사용",
      color: "bg-purple-500",
    },
    {
      icon: ImageIcon,
      title: "다양한 포즈 생성",
      description: "학습된 특징을 바탕으로 여러 판타지 스타일 이미지를 생성합니다",
      details: "평균 4-8장의 고품질 아바타 이미지 생성",
      color: "bg-pink-500",
    },
    {
      icon: Printer,
      title: "굿즈 제작",
      description: "생성된 이미지를 활용하여 다양한 굿즈로 제작합니다",
      details: "머그컵, 티셔츠, 폰케이스 등 맞춤 제작",
      color: "bg-green-500",
    },
  ]

  const successCases = [
    {
      title: "미국 펫 아바타 티셔츠 성공사례",
      description: "Etsy에서 펫 캐릭터 굿즈로 월 $15,000 수익 달성",
      source: "YouTube",
      views: "2.3M",
      link: "#",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "PhotoPet AI 서비스 분석",
      description: "AI 펫 아바타 시장의 급성장과 수익 모델 분석",
      source: "TechCrunch",
      views: "850K",
      link: "#",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "반려동물 굿즈 시장 트렌드",
      description: "2024년 펫테크 시장 규모 $24B 돌파 전망",
      source: "Forbes",
      views: "1.2M",
      link: "#",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
  ]

  const blogPosts = [
    {
      title: "AI 모델 튜닝 과정 공개",
      excerpt: "fofr/consistent-character 모델을 반려동물에 최적화한 과정을 상세히 공유합니다",
      date: "2024-01-15",
      tag: "개발일지",
      readTime: "5분",
    },
    {
      title: "크라우드펀딩 준비 과정",
      excerpt: "와디즈 펀딩 준비부터 런칭까지의 모든 과정을 투명하게 공개합니다",
      date: "2024-01-10",
      tag: "공지",
      readTime: "3분",
    },
    {
      title: "서버 인프라 구축기",
      excerpt: "Mac Mini M2로 AI 서비스를 운영하며 겪은 경험과 노하우를 공유합니다",
      date: "2024-01-05",
      tag: "개발일지",
      readTime: "7분",
    },
  ]

  const stats = [
    { label: "오늘 생성된 아바타", value: "247", icon: ImageIcon, color: "text-blue-600" },
    { label: "평균 처리 시간", value: "58초", icon: Cpu, color: "text-purple-600" },
    { label: "만족도 평점", value: "4.8/5", icon: TrendingUp, color: "text-green-600" },
    { label: "누적 사용자", value: "1,247", icon: Users, color: "text-pink-600" },
  ]

  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800">
            <Cpu className="h-4 w-4 mr-2" />
            기술 & 신뢰성
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">어떻게 이게 가능할까요?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            최첨단 AI 기술과 검증된 시장 사례를 바탕으로 한 신뢰할 수 있는 서비스입니다
          </p>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* AI Pipeline Infographic */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">AI 처리 파이프라인</h3>

          <div className="relative">
            {/* Desktop View */}
            <div className="hidden md:flex items-center justify-between">
              {pipeline.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex-1 relative">
                    <div
                      className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 ${
                        step.color
                      } ${activeStep === index ? "scale-110 shadow-lg" : "hover:scale-105"}`}
                      onClick={() => setActiveStep(index)}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <div className="text-center mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600 max-w-xs mx-auto">{step.description}</p>
                    </div>

                    {index < pipeline.length - 1 && (
                      <ArrowRight className="absolute top-8 -right-4 h-6 w-6 text-gray-400 transform -translate-y-1/2" />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-6">
              {pipeline.map((step, index) => {
                const Icon = step.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${step.color}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                          <p className="text-xs text-gray-500">{step.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Active Step Details */}
            <div className="hidden md:block mt-8">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">{pipeline[activeStep].title}</h4>
                  <p className="text-gray-600">{pipeline[activeStep].details}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Success Cases */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">이미 이런 사례가 있어요</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {successCases.map((case_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={case_.thumbnail || "/placeholder.svg"}
                      alt={case_.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/70 text-white">{case_.source}</Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">{case_.views} views</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {case_.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">{case_.description}</p>

                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      자세히 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Developer Blog */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">개발자 블로그</h3>
            <p className="text-gray-600">개발 과정과 기술적 인사이트를 투명하게 공유합니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant={post.tag === "개발일지" ? "default" : "secondary"}
                      className={post.tag === "개발일지" ? "bg-purple-100 text-purple-800" : ""}
                    >
                      {post.tag}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{post.readTime} 읽기</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              <ExternalLink className="h-4 w-4 mr-2" />
              전체 블로그 보기
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">AI 기술에 대해 더 알고 싶나요?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              기술적 세부사항, 개발 과정, 그리고 앞으로의 로드맵을 블로그에서 확인해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                기술 블로그 방문
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                개발자에게 문의
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
