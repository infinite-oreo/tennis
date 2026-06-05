/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/card · badge，依赖 lucide-react，依赖 SectionTitle
 * [OUTPUT]: 对外提供 FeaturesSection Bento 网格（6 特性，不规则布局）
 * [POS]: landing 层核心价值展示区，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, BarChart3, CalendarDays, Users, PlayCircle, TrendingUp } from 'lucide-react'
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from '@/lib/motion'
import SectionTitle from '@/components/landing/SectionTitle'

const FEATURES = [
  {
    icon: Zap,
    title: 'Real-Time Scores',
    desc: 'Score updates 3× faster than official sites — via WebSocket push under 0.3s. Every ATP & WTA event covered simultaneously.',
    span: 'lg:col-span-2',
    badge: 'Core Feature',
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    desc: 'Serve speed, break-point conversion, ace counts — granular stats down to every single point.',
    span: '',
  },
  {
    icon: CalendarDays,
    title: 'Smart Schedule',
    desc: "Full-season calendar at a glance, with push alerts 30 minutes before your matches start.",
    span: '',
  },
  {
    icon: Users,
    title: 'Player Profiles',
    desc: '1,000+ active ATP/WTA players — career records, current form, and playing style breakdowns.',
    span: '',
  },
  {
    icon: PlayCircle,
    title: 'Match Highlights',
    desc: 'Key points, break-point moments, and tiebreak rallies saved and ready to rewatch any time.',
    span: '',
  },
  {
    icon: TrendingUp,
    title: 'Live Rankings',
    desc: 'Weekly points movements, ranking trajectories, and year-end championship race — all tracked in real time.',
    span: '',
  },
]

function FeatureIcon({ Icon }) {
  return (
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0"
      style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 75%, black) 100%)',
        boxShadow: '0 4px 12px color-mix(in srgb, var(--primary) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
    >
      <Icon className="w-5 h-5 text-primary-foreground" />
    </div>
  )
}

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <SectionTitle>Everything you need, in one place</SectionTitle>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Live scores to deep stats, match alerts to player profiles — one platform handles it all.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map(({ icon: Icon, title, desc, span, badge }) => (
            <motion.div key={title} variants={scaleIn} className={span}>
              <Card variant="raised" className="h-full group cursor-default">
                <CardHeader className="pb-2">
                  <FeatureIcon Icon={Icon} />
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    {badge && <Badge variant="default" className="text-xs">{badge}</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
