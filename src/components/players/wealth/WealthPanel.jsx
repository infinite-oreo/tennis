/**
 * [INPUT]: 依赖 framer-motion，依赖 @/lib/motion 的 springs，依赖 @/components/ui/card · badge，依赖 lucide-react，
 *          依赖 @/data/wealth 的 BIG3_WEALTH，依赖 @/components/subscription/PremiumGate，依赖本目录 wealth/* 子组件
 * [OUTPUT]: 导出 WealthPanel——费德勒/纳达尔/德约科维奇财富配置整合面板（切换 + 配置条形图 + 对比 + 生涯曲线）
 * [POS]: players 层 Wealth 面板，被 PlayersPage 的 TabsContent 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp } from 'lucide-react'
import { springs } from '@/lib/motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BIG3_WEALTH } from '@/data/wealth'
import PremiumGate from '@/components/subscription/PremiumGate'
import PlayerSwitcher from './PlayerSwitcher'
import AllocationBars from './AllocationBars'
import WealthCompareStrip from './WealthCompareStrip'
import WealthGrowthChart from './WealthGrowthChart'
import AnimatedNumber from './AnimatedNumber'

export default function WealthPanel() {
  const [activeId, setActiveId] = useState(BIG3_WEALTH[0].id)
  const player = BIG3_WEALTH.find(p => p.id === activeId)

  return (
    <div className="space-y-6 p-2 sm:p-4">
      <PlayerSwitcher players={BIG3_WEALTH} activeId={activeId} onChange={setActiveId} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: springs.gentle }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-1">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{player.name} · Estimated Net Worth</p>
              <p className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--primary)' }}>
                <AnimatedNumber value={player.totalM} prefix="$" suffix="M" />
              </p>
            </div>
            <Badge variant="secondary" className="w-fit gap-1.5">
              <Sparkles className="w-3 h-3" />
              {player.status} · Turned pro {player.turnedPro}
            </Badge>
          </div>

          <WealthCompareStrip players={BIG3_WEALTH} activeId={activeId} onChange={setActiveId} />

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Asset Allocation</h3>
            <AllocationBars allocation={player.allocation} totalM={player.totalM} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 px-1 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              Career Net Worth Trajectory
            </h3>
            <PremiumGate label="Unlock the full career wealth trajectory with Pro">
              <Card variant="inset" className="p-4">
                <WealthGrowthChart growth={player.growth} />
              </Card>
            </PremiumGate>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
