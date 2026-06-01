/**
 * [INPUT]: 无外部数据依赖，依赖 framer-motion 动效
 * [OUTPUT]: 导出 LogoBar 信任背书条，展示合作赛事/媒体名称
 * [POS]: landing 层 Hero 下方信任带，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { fadeInUp, viewportConfig } from '@/lib/motion'

const LOGOS = ['ATP Tour', 'WTA', 'ITF', 'Wimbledon', 'Roland Garros', 'US Open', 'Australian Open']

export default function LogoBar() {
  return (
    <section className="border-y border-border bg-muted/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest"
        >
          深受全球顶级赛事球迷信赖
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {LOGOS.map((name) => (
            <span
              key={name}
              className="text-base md:text-lg font-bold text-muted-foreground/50 hover:text-foreground transition-colors duration-300 cursor-default tracking-tight"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
