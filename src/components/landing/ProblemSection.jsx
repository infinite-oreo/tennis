/**
 * [INPUT]: depends on framer-motion, @/components/ui/card, lucide-react
 * [OUTPUT]: exports ProblemSection pain-point empathy block
 * [POS]: landing layer third screen, pain activation, consumed by LandingPage.jsx
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { XCircle } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

const PAIN_POINTS = [
  {
    title: 'Matches slip by unnoticed',
    desc: "You find out a match started an hour ago — no alert, no reminder. The opening set is gone.",
  },
  {
    title: 'Stats are scattered everywhere',
    desc: 'Player data lives across a dozen apps. You spend more time switching tabs than actually watching tennis.',
  },
  {
    title: "Can't keep up with the conversation",
    desc: 'Friends dig into serve percentages and break-point conversions. You only know the scoreline.',
  },
  {
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-4">
            Still following tennis like it's 2005?
          </h2>
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
          {PAIN_POINTS.map(({ title, desc }) => (
            <motion.div key={title} variants={fadeInUp}>
              <Card variant="raised" className="h-full">
                <CardContent className="pt-6 flex flex-col gap-3">
                  <XCircle className="w-8 h-8 shrink-0" style={{ color: 'var(--destructive)' }} />
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
