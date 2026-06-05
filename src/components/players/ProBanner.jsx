/**
 * [INPUT]: 依赖 @/components/ui/button，依赖 lucide-react 的 Crown，依赖 @/contexts/SubscriptionContext
 * [OUTPUT]: 导出 ProBanner（会员状态条：Pro 徽章 或 Free 升级提示）
 * [POS]: players 层状态条，被 PlayersPage 顶部消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSubscription } from '@/contexts/SubscriptionContext'

export default function ProBanner({ onUpgrade }) {
  const { isPro, plan } = useSubscription()

  if (isPro) {
    return (
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-2xl mb-6 w-fit"
        style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}
      >
        <Crown className="w-4 h-4" style={{ color: 'var(--primary)' }} />
        <span className="text-sm font-semibold capitalize" style={{ color: 'var(--primary)' }}>
          {plan} — Full access unlocked
        </span>
      </div>
    )
  }

  return (
    <div
      className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl mb-6 border"
      style={{
        borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)',
        background: 'color-mix(in srgb, var(--primary) 6%, transparent)',
      }}
    >
      <div className="flex items-center gap-2">
        <Crown className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Free plan · Rankings 1–5 · 2 endorsement profiles
        </span>
      </div>
      <Button size="sm" variant="outline" onClick={onUpgrade} className="shrink-0">
        Upgrade to Pro
      </Button>
    </div>
  )
}
