"use client"

import { Button } from "@/components/ui/button"
import { Heart, Mail, MessageCircle, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-purple-400 fill-current" />
              <span className="text-2xl font-bold">PetPixie</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              AI 기술로 반려동물을 판타지 캐릭터로 변환하는 마법 같은 서비스입니다. 세상에 하나뿐인 우리 아이의 특별한
              모습을 만나보세요.
            </p>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:text-white bg-transparent"
              >
                <Mail className="h-4 w-4 mr-2" />
                이메일 문의
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:text-white bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                카카오톡
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">바로가기</h4>
            <div className="space-y-2">
              <a href="#demo" className="block text-gray-400 hover:text-white transition-colors">
                AI 데모 체험
              </a>
              <a href="#goods" className="block text-gray-400 hover:text-white transition-colors">
                굿즈 미리보기
              </a>
              <a href="#tech" className="block text-gray-400 hover:text-white transition-colors">
                기술 정보
              </a>
              <a href="#crowdfunding" className="block text-gray-400 hover:text-white transition-colors">
                펀딩 참여
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">지원</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                자주 묻는 질문
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                이용약관
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                환불 정책
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>© 2025 PetPixie. All rights reserved.</p>
              <p className="mt-1">Powered by Replicate AI</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* AI Disclosure */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              ⚠️ <strong>AI 생성물 표기:</strong> 모든 아바타 이미지는 AI에 의해 생성되었으며 실제 반려동물을 그대로 사진
              찍은 것이 아닙니다. 본 서비스는 EU AI법 및 한국 AI법의 AI 생성물 표기 의무를 준수합니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
