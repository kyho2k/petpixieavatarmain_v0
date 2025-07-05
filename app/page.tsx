import { HeroSection } from "@/components/hero-section"
import { DemoSection } from "@/components/demo-section"
import { TechInfoSection } from "@/components/tech-info-section"
import { GoodsPreviewSection } from "@/components/goods-preview-section"
import { CrowdfundingSection } from "@/components/crowdfunding-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { LiveStatsBanner } from "@/components/live-stats-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navigation />
      <LiveStatsBanner />
      <main>
        <HeroSection />
        <DemoSection />
        <TechInfoSection />
        <GoodsPreviewSection />
        <CrowdfundingSection />
      </main>
      <Footer />
    </div>
  )
}
