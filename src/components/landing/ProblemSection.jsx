/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/card，依赖 lucide-react，依赖 SectionTitle
 * [OUTPUT]: 对外提供 ProblemSection 痛点共鸣区
 * [POS]: landing 层第三屏，痛点激活区，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { BellOff, Layers, Users, Rewind } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'
import SectionTitle from '@/components/landing/SectionTitle'

const PAIN_POINTS = [
  {
    icon: BellOff,
    title: 'Matches slip by unnoticed',
    desc: "You find out a match started an hour ago — no alert, no reminder. The opening set is gone.",
  },
  {
    icon: Layers,
    title: 'Stats are scattered everywhere',
    desc: 'Player data lives across a dozen apps. You spend more time switching tabs than actually watching tennis.',
  },
  {
    icon: Users,
    title: "Can't keep up with the conversation",
    desc: 'Friends dig into serve percentages and break-point conversions. You only know the scoreline.',
  },
  {
    icon: Rewind,
    title: 'Great moments vanish instantly',
    desc: "Match points, tweeners, epic rallies — blink and they're gone. No replay, just a text recap.",
  },
]

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--muted)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <SectionTitle>Still following tennis like it&apos;s 2005?</SectionTitle>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Every serious fan has been there. It's time to fix that.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {PAIN_POINTS.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeInUp}>
              <Card variant="raised" className="h-full">
                <CardContent className="pt-6 flex flex-col gap-3">
                  <Icon className="w-5 h-5 shrink-0 text-muted-foreground" />
                  <h3 className="text-base font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
