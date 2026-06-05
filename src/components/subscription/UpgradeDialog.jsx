/**
 * [INPUT]: 依赖 @/components/ui/dialog · button · badge，依赖 @/contexts/SubscriptionContext 的 useSubscription，依赖 @/contexts/AuthContext 的 useAuth，依赖 lucide-react
 * [OUTPUT]: 对外提供 UpgradeDialog 组件（受控弹窗，open/onOpenChange props）
 * [POS]: subscription 层的升级入口 UI，被 PremiumGate 和 Pricing.jsx 的 CTA 按钮触发
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Users, ArrowRight, LogIn } from 'lucide-react'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { useAuth } from '@/contexts/AuthContext'
import { signInWithGoogle } from '@/lib/auth'

// ─── Pro/Team 计划特性列表 ────────────────────────────────────────
const PRO_FEATURES = [
  'Full ATP & WTA rankings (Top 100)',
  'Complete player endorsement data',
  'Historical ranking trends',
  'H2H match records',
  'Weekly exclusive data reports',
  'Ad-free experience',
]

const PLANS = [
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: '/mo',
    Icon: Zap,
    badge: 'Most Popular',
    features: PRO_FEATURES,
  },
  {
    id: 'team',
    name: 'Team',
    price: '$19.99',
    period: '/mo',
    Icon: Users,
    features: [...PRO_FEATURES, 'Up to 10 seats', 'Data API access', 'Dedicated support'],
  },
]

export default function UpgradeDialog({ open, onOpenChange }) {
  const { user } = useAuth()
  const { upgrade, loading, isPro } = useSubscription()
  const [selected, setSelected] = useState('pro')
  const [success, setSuccess] = useState(false)

  async function handleUpgrade() {
    const { error } = await upgrade(selected)
    if (!error) { setSuccess(true); setTimeout(() => { setSuccess(false); onOpenChange(false) }, 1800) }
  }

  // 未登录 → 引导先登录
  if (!user) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Sign in to upgrade</DialogTitle>
            <DialogDescription>You need an account to subscribe to Pro.</DialogDescription>
          </DialogHeader>
          <Button className="w-full gap-2 mt-2" onClick={signInWithGoogle}>
            <LogIn className="w-4 h-4" />
            Continue with Google
          </Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <Badge variant="secondary" className="w-fit mb-2">Upgrade</Badge>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {success ? '🎉 Welcome to Pro!' : 'Unlock the full experience'}
          </DialogTitle>
          {!success && (
            <DialogDescription>
              Get complete rankings, all endorsement data, and exclusive insights.
            </DialogDescription>
          )}
        </DialogHeader>

        {success ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Your account has been upgraded. Enjoy full access.
          </p>
        ) : (
          <>
            {/* 计划选择器 */}
            <div className="grid grid-cols-2 gap-3 my-4">
              {PLANS.map(({ id, name, price, period, Icon, badge }) => (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className={[
                    'relative rounded-2xl p-4 text-left transition-all border-2',
                    selected === id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/40',
                  ].join(' ')}
                >
                  {badge && (
                    <Badge variant="secondary" className="absolute -top-2.5 left-3 text-[10px]">
                      {badge}
                    </Badge>
                  )}
                  <Icon className="w-5 h-5 mb-2" style={{ color: 'var(--primary)' }} />
                  <p className="font-semibold text-foreground">{name}</p>
                  <p className="text-lg font-bold text-foreground">
                    {price}<span className="text-xs font-normal text-muted-foreground">{period}</span>
                  </p>
                </button>
              ))}
            </div>

            {/* 功能列表 */}
            <ul className="space-y-2 mb-5">
              {(PLANS.find(p => p.id === selected)?.features ?? PRO_FEATURES).map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <Check className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <Button className="w-full gap-2" onClick={handleUpgrade} disabled={loading || isPro}>
                {loading ? 'Processing…' : isPro ? 'Already subscribed' : `Upgrade to ${selected === 'pro' ? 'Pro' : 'Team'}`}
                {!loading && !isPro && <ArrowRight className="w-4 h-4" />}
              </Button>
              {/* Demo 提示：生产环境替换为 Stripe Checkout */}
              <p className="text-[11px] text-center text-muted-foreground">
                Demo mode — no payment required. Production will integrate Stripe.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
