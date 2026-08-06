/**
 * [INPUT]: 依赖 framer-motion，依赖 @/lib/motion 的 springs，依赖 @/components/ui/card · badge，依赖 lucide-react，
 *          依赖 @/data/sinnerStats 的 SINNER_PROFILE · RANKING_TREND，依赖 @/components/subscription/PremiumGate，
 *          依赖本目录 analysis/* 子组件，依赖 ../wealth/AnimatedNumber
 * [OUTPUT]: 导出 SinnerAnalysisPanel——Jannik Sinner 赛场战绩分析整合面板（生涯胜率 + 场地战绩 + 大满贯战绩 + 排名走势）
 * [POS]: players 层 Analysis 面板，被 PlayersPage 的 TabsContent 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SINNER_PROFILE, RANKING_TREND } from '@/data/sinnerStats'
import PremiumGate from '@/components/subscription/PremiumGate'
import AnimatedNumber from '../wealth/AnimatedNumber'
import SurfaceRecordBars from './SurfaceRecordBars'
import GrandSlamRecord from './GrandSlamRecord'
import RankingTrendChart from './RankingTrendChart'

export default function SinnerAnalysisPanel() {
  const { name, flag, rank, age, careerWins, careerLosses, titles } = SINNER_PROFILE
  const winPct = Math.round((careerWins / (careerWins + careerLosses)) * 100)

  return (
    <div className="space-y-6 p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-1">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{flag} {name} · Career Win Rate</p>
          <p className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--primary)' }}>
            <AnimatedNumber value={winPct} suffix="%" />
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {careerWins}-{careerLosses} career record · {titles} titles
          </p>
        </div>
        <Badge variant="secondary" className="w-fit gap-1.5">
          World No. {rank} · Age {age}
        </Badge>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Surface Record</h3>
        <SurfaceRecordBars />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Grand Slam Record</h3>
        <GrandSlamRecord />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 px-1 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4" style={{ color: 'var(--primary)' }} />
          Ranking Trajectory
        </h3>
        <PremiumGate label="Unlock the full ranking trajectory with Pro">
          <Card variant="inset" className="p-4">
            <RankingTrendChart trend={RANKING_TREND} />
          </Card>
        </PremiumGate>
      </div>
    </div>
  )
}
