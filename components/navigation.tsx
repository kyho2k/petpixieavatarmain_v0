"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Menu, X } from "lucide-react"

interface NavigationProps {
  currentSection: string
}

export default function Navigation({ currentSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fundingProgress, setFundingProgress] = useState(80)
  const [daysLeft, setDaysLeft] = useState(15)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "hero", label: "소개" },
    { id: "demo", label: "기술데모" },
    { id: "goods", label: "굿즈미리보기" },
    { id: "crowdfunding", label: "후원하기" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-purple-600 fill-current" />
            <span className="text-xl font-bold text-gray-900">PetPixie</span>
          </div>

          {/* Funding Progress Badge */}
          <div className="hidden md:flex items-center space-x-4">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              펀딩 {fundingProgress}% 달성 · {daysLeft}일 남음
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  currentSection === item.id ? "text-purple-600" : "text-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => scrollToSection("crowdfunding")} className="bg-purple-600 hover:bg-purple-700">
              후원하기
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100">
            <div className="flex flex-col space-y-3">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 self-start">
                펀딩 {fundingProgress}% 달성 · {daysLeft}일 남음
              </Badge>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-sm font-medium transition-colors hover:text-purple-600 ${
                    currentSection === item.id ? "text-purple-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("crowdfunding")}
                className="bg-purple-600 hover:bg-purple-700 self-start"
              >
                후원하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
