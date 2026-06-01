/**
 * [INPUT]: 依赖 @/components/landing/* 的全部 Section 组件，依赖 @/components/layout/Header
 * [OUTPUT]: 导出 LandingPage 落地页，路由 "/"
 * [POS]: pages 层主落地页，组合所有 landing section，被 App.jsx 的 Route 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import Header from '@/components/layout/Header'
import Hero from '@/components/landing/Hero'
import LogoBar from '@/components/landing/LogoBar'
import ProblemSection from '@/components/landing/ProblemSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import HowItWorks from '@/components/landing/HowItWorks'
import Testimonials from '@/components/landing/Testimonials'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import FinalCTA from '@/components/landing/FinalCTA'
import LandingFooter from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <LogoBar />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  )
}
