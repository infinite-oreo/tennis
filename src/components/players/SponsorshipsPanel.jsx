/**
 * [INPUT]: 依赖 framer-motion，依赖 @/lib/motion，依赖 @/contexts/SubscriptionContext，依赖 @/components/subscription/PremiumGate，依赖 @/data/players，依赖 ./SponsorCard
 * [OUTPUT]: 导出 SponsorshipsPanel（签约面板，含 Pro 门控网格）
 * [POS]: players 层签约面板，被 PlayersPage 的 TabsContent 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'
import { useSubscription } from '@/contexts/SubscriptionContext'
import PremiumGate from '@/components/subscription/PremiumGate'
import { FREE_SPONSORS_LIMIT } from '@/data/players'
import SponsorCard from './SponsorCard'

const Grid = ({ players }) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="grid grid-cols-1 lg:grid-cols-2 gap-5"
  >
    {players.map(p => <SponsorCard key={p.name} player={p} />)}
  </motion.div>
)

export default function SponsorshipsPanel({ players }) {
  const { isPro } = useSubscription()
  const visible = players.slice(0, FREE_SPONSORS_LIMIT)
  const locked  = players.slice(FREE_SPONSORS_LIMIT)

  return (
    <div className="space-y-5">
      <Grid players={visible} />
      {locked.length > 0 && (
        isPro
          ? <Grid players={locked} />
          : (
            <PremiumGate label="Unlock all player endorsement deals with Pro">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {locked.map(p => <SponsorCard key={p.name} player={p} />)}
              </div>
            </PremiumGate>
          )
      )}
    </div>
  )
}
