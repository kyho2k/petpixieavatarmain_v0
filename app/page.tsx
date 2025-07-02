"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import DemoSection from "@/components/demo-section"
import ResultsSection from "@/components/results-section"
import BeforeAfterSection from "@/components/before-after-section"
import GoodsPreviewSection from "@/components/goods-preview-section"
import TechInfoSection from "@/components/tech-info-section"
import CrowdfundingSection from "@/components/crowdfunding-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import LiveStatsBanner from "@/components/live-stats-banner"

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState("hero")
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [selectedSample, setSelectedSample] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "demo", "results", "before-after", "goods", "tech", "crowdfunding"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <LiveStatsBanner />
      <Navigation currentSection={currentSection} />

      <section id="hero">
        <HeroSection />
      </section>

      <section id="demo">
        <DemoSection onImageGenerated={setGeneratedImages} onSampleSelected={setSelectedSample} />
      </section>

      {generatedImages.length > 0 && (
        <>
          <section id="results">
            <ResultsSection images={generatedImages} />
          </section>

          <section id="before-after">
            <BeforeAfterSection originalImage={selectedSample} generatedImage={generatedImages[0]} />
          </section>
        </>
      )}

      <section id="goods">
        <GoodsPreviewSection sampleImage={generatedImages[0]} />
      </section>

      <section id="tech">
        <TechInfoSection />
      </section>

      <section id="crowdfunding">
        <CrowdfundingSection />
      </section>

      <Footer />
    </div>
  )
}
