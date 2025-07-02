"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Sparkles, Zap } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const beforeAfterExamples = [
    {
      before: "/placeholder.svg?height=400&width=400",
      after: "/placeholder.svg?height=400&width=400",
      title: "골든 리트리버 → 마법사",
    },
    {
      before: "/placeholder.svg?height=400&width=400",
      after: "/placeholder.svg?height=400&width=400",
      title: "페르시안 고양이 → 공주",
    },
    {
      before: "/placeholder.svg?height=400&width=400",
      after: "/placeholder.svg?height=400&width=400",
      title: "비글 → 기사",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % beforeAfterExamples.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [beforeAfterExamples.length])

  const scrollToDemo = () => {
    const demoSection = document.getElementById("demo")
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-20 left-10 h-6 w-6 text-purple-400 animate-pulse" />
        <Zap className="absolute top-40 right-20 h-8 w-8 text-pink-400 animate-bounce" />
        <Sparkles className="absolute bottom-40 left-20 h-4 w-4 text-blue-400 animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200">
              <Sparkles className="h-4 w-4 mr-2" />
              AI 기술로 만드는 마법 같은 경험
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              내 펫을{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                판타지 주인공
              </span>
              으로!
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              반려동물 사진 한 장으로 여러 장의 애니메이션 스타일 아바타를 생성해보세요.
              <br className="hidden sm:block" />단 1분만에 마법 같은 변신을 경험할 수 있습니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToDemo}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                1분 만에 체험하기
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg bg-transparent"
              >
                작품 갤러리 보기
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1,247</div>
                <div className="text-sm text-gray-500">생성된 아바타</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">58초</div>
                <div className="text-sm text-gray-500">평균 처리시간</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">80%</div>
                <div className="text-sm text-gray-500">펀딩 달성률</div>
              </div>
            </div>
          </div>

          {/* Right Content - Before/After Slider */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{beforeAfterExamples[currentSlide].title}</h3>
                <div className="flex justify-center space-x-2">
                  {beforeAfterExamples.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-purple-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="relative mb-3">
                    <Image
                      src={beforeAfterExamples[currentSlide].before || "/placeholder.svg"}
                      alt="Before"
                      width={150}
                      height={150}
                      className="rounded-lg shadow-md mx-auto"
                    />
                    <Badge className="absolute -top-2 -right-2 bg-gray-100 text-gray-800">원본</Badge>
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative mb-3">
                    <Image
                      src={beforeAfterExamples[currentSlide].after || "/placeholder.svg"}
                      alt="After"
                      width={150}
                      height={150}
                      className="rounded-lg shadow-md mx-auto"
                    />
                    <Badge className="absolute -top-2 -right-2 bg-purple-100 text-purple-800">AI 결과</Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <ArrowDown className="h-6 w-6 text-purple-600 animate-bounce" />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToDemo}
          className="flex flex-col items-center text-gray-500 hover:text-purple-600 transition-colors"
        >
          <span className="text-sm mb-2">체험해보기</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </div>
  )
}
