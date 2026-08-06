/**
 * [INPUT]: 依赖 framer-motion，依赖 @/lib/motion 的 staggerContainer · fadeInUp，依赖 lucide-react 的 Trophy · Medal，
 *          依赖 @/data/sinnerStats 的 GRAND_SLAM_RECORD
 * [OUTPUT]: 导出 GrandSlamRecord——四大满贯战绩卡片网格，冠军用主色高亮，亚军用低饱和灰调
 * [POS]: analysis 层展示组件，被 SinnerAnalysisPanel 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Trophy, Medal } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/motion'
import { GRAND_SLAM_RECORD } from '@/data/sinnerStats'

export default function GrandSlamRecord() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 gap-3">
      {GRAND_SLAM_RECORD.map(({ key, label, result, resultLabel, years }) => {
        const isChampion = result === 'champion'
        const Icon = isChampion ? Trophy : Medal

        return (
          <motion.div
            key={key}
            variants={fadeInUp}
            className="rounded-2xl p-4"
            style={{
              background: isChampion
                ? 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 85%, black) 50%, color-mix(in srgb, var(--primary) 70%, black) 100%)'
                : 'color-mix(in srgb, var(--muted) 70%, transparent)',
              boxShadow: isChampion
                ? 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15), 0 6px 16px color-mix(in srgb, var(--primary) 35%, transparent)'
                : 'inset 0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon
                className="w-4 h-4 flex-shrink-0"
                style={{ color: isChampion ? 'var(--primary-foreground)' : 'var(--muted-foreground)' }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: isChampion ? 'var(--primary-foreground)' : 'var(--muted-foreground)' }}
              >
                {resultLabel}
              </span>
            </div>
            <p
              className="text-sm font-bold leading-tight mb-1"
              style={{ color: isChampion ? 'var(--primary-foreground)' : 'var(--foreground)' }}
            >
              {label}
            </p>
            <p
              className="text-xs"
              style={{ color: isChampion ? 'color-mix(in srgb, var(--primary-foreground) 80%, transparent)' : 'var(--muted-foreground)' }}
            >
              {years.join(' · ')}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
