/**
 * [INPUT]: 依赖 @/contexts/SubscriptionContext 的 useSubscription，依赖 @/components/ui/button，依赖 ./UpgradeDialog，依赖 lucide-react
 * [OUTPUT]: 对外提供 PremiumGate 包裹组件——Pro 用户透传 children，免费用户看到模糊遮罩 + 升级 CTA
 * [POS]: subscription 层的内容门控，被 PlayersPage 的排名尾部和签约数据板块消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSubscription } from '@/contexts/SubscriptionContext'
import UpgradeDialog from './UpgradeDialog'

/**
 * @param {React.ReactNode} children  - 被保护的内容
 * @param {string}          className - 外层容器追加类名
 * @param {string}          label     - 锁定原因描述文字（可选）
 */
export default function PremiumGate({ children, className = '', label = 'Unlock full data with Pro' }) {
  const { isPro } = useSubscription()
  const [open, setOpen] = useState(false)

  if (isPro) return children

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      {/* 模糊内容层：pointer-events-none 防止点击穿透 */}
      <div
        className="pointer-events-none select-none"
        style={{ filter: 'blur(8px)', opacity: 0.35 }}
        aria-hidden="true"
      >
        {children}
      </div>

      {/* 悬浮锁定面板 */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl"
        style={{
          background: 'color-mix(in srgb, var(--background) 60%, transparent)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div
          className="rounded-full p-3"
          style={{
            background: 'color-mix(in srgb, var(--primary) 12%, transparent)',
            border: '1px solid color-mix(in srgb, var(--primary) 25%, transparent)',
          }}
        >
          <Lock className="w-5 h-5" style={{ color: 'var(--primary)' }} />
        </div>

        <div className="text-center px-4">
          <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
          <p className="text-xs text-muted-foreground">Full rankings · All endorsement deals · Exclusive data</p>
        </div>

        <Button size="sm" onClick={() => setOpen(true)} className="gap-2">
          Upgrade to Pro — $9.99/mo
        </Button>
      </div>

      <UpgradeDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
