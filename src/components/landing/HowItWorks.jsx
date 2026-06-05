/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/badge，依赖 lucide-react，依赖 @/lib/motion，依赖 SectionTitle
 * [OUTPUT]: 对外提供 HowItWorks 三步流程区，含连接线与阶梯入场动效
 * [POS]: landing 层使用流程区，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { UserPlus, Star, BellRing } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'
import SectionTitle from '@/components/landing/SectionTitle'

const STEPS = [
  {
    icon: UserPlus,
    title: 'Create your account',
    desc: 'Sign up in 30 seconds — no credit card needed. Instant access to all core features.',
  },
  {
    icon: Star,
    title: 'Follow your favorites',
    desc: 'Pick from 1,000+ players and choose the tournaments you care about most.',
  },
  {
    icon: BellRing,
    title: 'Get real-time alerts',
    desc: 'Match start, big points, final score — every key moment delivered the second it happens.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--muted)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">How It Works</Badge>
          <SectionTitle>Up and running in three steps</SectionTitle>
          <p className="text-lg text-muted-foreground">No tutorial required.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Desktop connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(33%+1rem)] right-[calc(33%+1rem)] border-t-2 border-dashed border-border" />

          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex flex-col items-center justify-center mb-6 relative z-10"
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 75%, black) 100%)',
                  boxShadow: '0 8px 24px color-mix(in srgb, var(--primary) 35%, transparent), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                <Icon className="w-7 h-7 text-primary-foreground" />
                <span className="text-[10px] text-primary-foreground/70 font-bold mt-0.5">0{i + 1}</span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
