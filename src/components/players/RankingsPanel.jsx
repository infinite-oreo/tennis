/**
 * [INPUT]: 依赖 framer-motion，依赖 @/lib/motion，依赖 @/contexts/SubscriptionContext，依赖 @/components/subscription/PremiumGate，依赖 @/data/players，依赖 ./RankRow
 * [OUTPUT]: 导出 RankingsPanel（排名列表，含表头 + 门控）
 * [POS]: players 层排名面板，被 PlayersPage 的 TabsContent 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'
import { useSubscription } from '@/contexts/SubscriptionContext'
import PremiumGate from '@/components/subscription/PremiumGate'
import { FREE_RANKINGS_LIMIT } from '@/data/players'
import RankRow from './RankRow'

export default function RankingsPanel({ players }) {
  const { isPro } = useSubscription()
  const visible = players.slice(0, FREE_RANKINGS_LIMIT)
  const locked  = players.slice(FREE_RANKINGS_LIMIT)

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-1">
      <div className="flex items-center gap-3 px-4 py-2 text-xs text-muted-foreground">
        <div className="w-8 text-center">Rank</div>
        <div className="w-5" />
        <div className="flex-1">Player</div>
        <div className="w-8 text-right">Chg</div>
        <div className="w-20 text-right">Points</div>
      </div>

      {visible.map(p => <RankRow key={p.name} player={p} />)}

      {isPro
        ? locked.map(p => <RankRow key={p.name} player={p} />)
        : (
          <PremiumGate label="See the full Top 10 rankings with Pro">
            <div className="space-y-1">
              {locked.map(p => <RankRow key={p.name} player={p} />)}
            </div>
          </PremiumGate>
        )
      }
    </motion.div>
  )
}
