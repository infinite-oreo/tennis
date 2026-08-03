/**
 * [INPUT]: 依赖 framer-motion，依赖 @/lib/motion 的 springs · staggerContainer · fadeInUp，依赖 lucide-react 图标，
 *          依赖 @/data/wealth 的 WEALTH_CATEGORIES，依赖 ./AnimatedNumber
 * [OUTPUT]: 导出 AllocationBars——资产配置横向条形图，长度编码金额，点击展开分类说明
 * [POS]: wealth 层核心图表，被 WealthPanel 消费；随 activeId 切换时条形宽度以 layout 动画平滑过渡
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Handshake, Rocket, Building2, PiggyBank, ChevronDown } from 'lucide-react'
import { springs, staggerContainer, fadeInUp } from '@/lib/motion'
import { WEALTH_CATEGORIES } from '@/data/wealth'
import AnimatedNumber from './AnimatedNumber'

const ICONS = { Trophy, Handshake, Rocket, Building2, PiggyBank }

export default function AllocationBars({ allocation, totalM }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
      {WEALTH_CATEGORIES.map(({ key, label, icon }) => {
        const item = allocation[key]
        const pct = Math.round((item.valueM / totalM) * 100)
        const isOpen = expanded === key
        const Icon = ICONS[icon]

        return (
          <motion.div key={key} variants={fadeInUp}>
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : key)}
              className="w-full text-left rounded-2xl px-4 py-3 transition-colors hover:bg-muted/60"
              style={{
                background: isOpen ? 'color-mix(in srgb, var(--muted) 60%, transparent)' : 'transparent',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'color-mix(in srgb, var(--primary) 14%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--primary) 22%, transparent)',
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-foreground truncate">{label}</span>
                    <span className="text-sm font-bold text-foreground flex-shrink-0">
                      <AnimatedNumber value={item.valueM} prefix="$" suffix="M" />
                      <span className="text-xs font-normal text-muted-foreground ml-1">{pct}%</span>
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
                      animate={{ width: `${pct}%` }}
                      transition={springs.smooth}
                    />
                  </div>
                </div>

                <ChevronDown
                  className="w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1, transition: springs.gentle }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.15 } }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-muted-foreground leading-relaxed pt-2 pl-12 pr-2">
                      {item.note}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
