"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PetPixie</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("demo-section")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              체험하기
            </button>
            <button
              onClick={() => scrollToSection("tech-info")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              기술정보
            </button>
            <button
              onClick={() => scrollToSection("goods-preview")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              굿즈미리보기
            </button>
            <button
              onClick={() => scrollToSection("crowdfunding")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              펀딩참여
            </button>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              후원하기
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("demo-section")}
                className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                체험하기
              </button>
              <button
                onClick={() => scrollToSection("tech-info")}
                className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                기술정보
              </button>
              <button
                onClick={() => scrollToSection("goods-preview")}
                className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                굿즈미리보기
              </button>
              <button
                onClick={() => scrollToSection("crowdfunding")}
                className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                펀딩참여
              </button>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 mt-2">
                후원하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
