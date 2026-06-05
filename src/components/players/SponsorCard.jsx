/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/card · badge · button，依赖 lucide-react 的 ShoppingBag，依赖 @/lib/motion，依赖 @/data/affiliates
 * [OUTPUT]: 导出 SponsorCard 组件（球员签约卡，含联盟营销购买链接）
 * [POS]: players 层签约展示组件，被 SponsorshipsPanel 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import { scaleIn } from '@/lib/motion'
import { AFFILIATE_LINKS, SHOPPABLE_CATEGORIES } from '@/data/affiliates'

function DealRow({ deal }) {
  const affiliateUrl = AFFILIATE_LINKS[deal.brand]
  const isShoppable  = SHOPPABLE_CATEGORIES.has(deal.category) && affiliateUrl

  return (
    <div
      className="flex items-center justify-between rounded-xl px-3 py-2"
      style={{
        background: 'color-mix(in srgb, var(--muted) 60%, transparent)',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--primary)' }} />
        <span className="text-sm font-medium text-foreground">{deal.brand}</span>
        <span className="text-xs text-muted-foreground hidden sm:inline">· {deal.category}</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs font-semibold text-foreground">
          ~${deal.annualM}<span className="font-normal text-muted-foreground">M/yr</span>
        </span>
        {isShoppable && (
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            title={`Shop ${deal.brand} tennis gear (affiliate link)`}
            onClick={e => e.stopPropagation()}
          >
            <Button variant="outline" size="sm" className="h-6 px-2 text-[10px] gap-1 rounded-lg">
              <ShoppingBag className="w-3 h-3" />
              Shop
            </Button>
          </a>
        )}
      </div>
    </div>
  )
}

export default function SponsorCard({ player }) {
  return (
    <motion.div variants={scaleIn}>
      <Card variant="raised" className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{player.flag}</span>
                <Badge variant="outline" className="text-xs">#{player.rank}</Badge>
              </div>
              <CardTitle className="text-base leading-tight">{player.name}</CardTitle>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-muted-foreground mb-0.5">Est. Annual</p>
              <p className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                ~${player.totalM}<span className="text-xs font-normal text-muted-foreground">M</span>
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {player.deals.map(deal => <DealRow key={deal.brand} deal={deal} />)}
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
            * Shop links may be affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
