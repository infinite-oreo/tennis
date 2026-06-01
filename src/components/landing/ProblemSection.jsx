/**
 * [INPUT]: 依赖 framer-motion 动效，依赖 @/components/ui/card，依赖 lucide-react 图标
 * [OUTPUT]: 导出 ProblemSection 痛点共鸣区
 * [POS]: landing 层第三屏，痛点激发，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { XCircle } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

const PAIN_POINTS = [
  {
    title: '赛程全靠记',
    desc: '比赛突然开始才发现，没有提前通知，精彩开局全错过。',
  },
  {
    title: '数据找不到',
    desc: '球员数据散落多个平台，在十几个 App 之间切来切去，累死了。',
  },
  {
    title: '聊天插不上嘴',
    desc: '朋友讨论技术细节，你只知道比分，完全没法深入交流。',
  },
  {
    title: '精彩瞬间已消失',
    desc: '关键分和高光时刻稍纵即逝，没有回放，只能靠文字描述脑补。',
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
            追球赛，还在这样？
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            每一位球迷都经历过这些痛苦。是时候结束了。
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
                  <XCircle
                    className="w-8 h-8 shrink-0"
                    style={{ color: 'var(--destructive)' }}
                  />
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
