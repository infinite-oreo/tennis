/**
 * [INPUT]: 依赖 framer-motion，依赖 @/lib/motion 的 springs · staggerContainer · fadeInUp，
 *          依赖 @/data/sinnerStats 的 SURFACE_RECORD
 * [OUTPUT]: 导出 SurfaceRecordBars——各场地(硬地/红土/草地)胜率横向条形图
 * [POS]: analysis 层核心图表，被 SinnerAnalysisPanel 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { springs, staggerContainer, fadeInUp } from '@/lib/motion'
import { SURFACE_RECORD } from '@/data/sinnerStats'

export default function SurfaceRecordBars() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
      {SURFACE_RECORD.map(({ key, label, wins, losses }) => {
        const total = wins + losses
        const winPct = Math.round((wins / total) * 100)

        return (
          <motion.div key={key} variants={fadeInUp} className="px-4 py-3 rounded-2xl">
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <span className="text-sm font-semibold text-foreground">{label}</span>
              <span className="text-sm text-foreground">
                <span className="font-bold">{wins}</span>
                <span className="text-muted-foreground">-{losses}</span>
                <span className="text-xs font-normal text-muted-foreground ml-1.5">{winPct}% win</span>
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: 'color-mix(in srgb, var(--muted-foreground) 15%, transparent)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, color-mix(in srgb, var(--primary) 70%, transparent), var(--primary))',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${winPct}%` }}
                transition={springs.smooth}
              />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
