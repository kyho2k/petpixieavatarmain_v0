"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Heart, Camera, Zap } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToDemo = () => {
    document.getElementById("demo-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 mr-2" />
          AI 기반 펫 아바타 생성 서비스
        </Badge>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
          우리 아이의
          <br />
          <span className="relative">
            특별한 순간을
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          </span>
          <br />
          AI로 만나보세요
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          단 한 장의 사진으로 반려동물의 귀여운 3D 아바타와 다양한 스타일의 캐릭터 이미지를 생성하세요.
          <br />
          <span className="text-purple-600 font-semibold">Meshy AI + LightX AI</span>의 최신 기술로 더욱 생생하게!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            onClick={scrollToDemo}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Camera className="w-5 h-5 mr-2" />
            지금 무료로 체험하기
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById("tech-info")?.scrollIntoView({ behavior: "smooth" })}
            className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full"
          >
            <Zap className="w-5 h-5 mr-2" />
            기술 정보 보기
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI 3D 모델링</h3>
              <p className="text-gray-600 text-sm">Meshy AI로 사진 한 장을 360도 회전 가능한 3D 모델로 변환</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">다양한 스타일</h3>
              <p className="text-gray-600 text-sm">디즈니, 애니메이션, 픽셀아트 등 원하는 스타일로 캐릭터 생성</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">실시간 생성</h3>
              <p className="text-gray-600 text-sm">평균 60초 내에 고품질 결과물을 실시간으로 확인</p>
            </CardContent>
          </Card>
        </div>

        {/* Sample showcase */}
        <div className="mt-16">
          <p className="text-gray-500 mb-6">
            이미 <span className="font-semibold text-purple-600">10,000+</span>명이 체험했어요!
          </p>
          <div className="flex justify-center space-x-4 opacity-75">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Sample 1"
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-lg"
            />
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Sample 2"
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-lg"
            />
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Sample 3"
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
