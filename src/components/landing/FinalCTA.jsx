/**
 * [INPUT]: depends on framer-motion, @/components/ui/button
 * [OUTPUT]: exports FinalCTA bottom conversion block (brand gradient bg + dual CTAs)
 * [POS]: landing layer final conversion, immediately after FAQ, consumed by LandingPage.jsx
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 80%, black) 50%, color-mix(in srgb, var(--primary) 60%, black) 100%)',
        }}
      />
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tighter mb-6"
          >
            Become a true insider today
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            Join 50,000+ fans who never miss a moment.
            Start free, upgrade whenever you're ready, cancel any time.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="xl" variant="secondary" className="px-12">
              Get Started Free
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="px-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Contact Us
            </Button>
          </motion.div>

          <motion.p variants={fadeInUp} className="mt-6 text-sm text-primary-foreground/60">
            ✓ No credit card required &nbsp;·&nbsp; ✓ Sign up in 30 seconds &nbsp;·&nbsp; ✓ Cancel any time
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
