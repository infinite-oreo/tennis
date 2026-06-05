/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/card · button · badge，依赖 lucide-react，依赖 @/components/subscription/UpgradeDialog，依赖 @/contexts/SubscriptionContext
 * [OUTPUT]: 对外提供 Pricing 定价区（3 档，中间高亮，Check/X 功能对比，CTA 接入真实升级逻辑）
 * [POS]: landing 层转化区，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Crown } from 'lucide-react'
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from '@/lib/motion'
import { useSubscription } from '@/contexts/SubscriptionContext'
import UpgradeDialog from '@/components/subscription/UpgradeDialog'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'The perfect starting point for casual fans.',
    highlighted: false,
    features: [
      { label: 'Top 5 rankings (ATP & WTA)',        included: true  },
      { label: '2 player endorsement profiles',     included: true  },
      { label: 'Basic player stats',                included: true  },
      { label: 'Full Top 10 rankings',              included: false },
      { label: 'All endorsement data',              included: false },
      { label: 'Exclusive data reports',            included: false },
      { label: 'Ad-free experience',                included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: '/mo',
    desc: 'Everything a serious tennis fan needs.',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { label: 'Full Top 10 rankings (ATP & WTA)', included: true },
      { label: 'All player endorsement data',      included: true },
      { label: 'H2H match records',                included: true },
      { label: 'Historical ranking trends',        included: true },
      { label: 'Weekly exclusive data reports',    included: true },
      { label: 'Match highlights',                 included: true },
      { label: 'Ad-free experience',               included: true },
    ],
  },
  {
    id: 'team',
    name: 'Team',
    price: '$19.99',
    period: '/mo',
    desc: 'Built for clubs, academies, and coaches.',
    highlighted: false,
    features: [
      { label: 'Everything in Pro',              included: true },
      { label: 'Up to 10 seats',                 included: true },
      { label: 'HD highlight downloads',         included: true },
      { label: 'Dedicated support',              included: true },
      { label: 'Data API access',                included: true },
      { label: 'Custom reporting',               included: true },
      { label: 'Early feature access',           included: true },
    ],
  },
]

function PlanCard({ plan, onUpgradeClick }) {
  const { plan: currentPlan } = useSubscription()
  const { id, name, price, period, desc, highlighted, badge, features } = plan

  const isCurrentPlan = currentPlan === id
  const isFreePlan    = id === 'free'

  function getCta() {
    if (isCurrentPlan) return { label: <><Crown className="w-3.5 h-3.5" /> Current Plan</>, disabled: true }
    if (isFreePlan)    return { label: 'Get Started Free', disabled: false, onClick: undefined }
    return { label: `Upgrade to ${name}`, disabled: false, onClick: () => onUpgradeClick(id) }
  }

  const cta = getCta()
  const ctaVariant = highlighted ? 'secondary' : isFreePlan ? 'outline' : 'default'

  return (
    <motion.div variants={scaleIn} className={highlighted ? 'md:-mt-4' : ''}>
      <Card
        variant={highlighted ? 'gradient' : 'raised'}
        className={`h-full ${highlighted ? 'ring-2 ring-primary' : ''}`}
      >
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className={`text-lg ${highlighted ? 'text-primary-foreground' : ''}`}>
              {name}
            </CardTitle>
            <div className="flex items-center gap-1.5">
              {isCurrentPlan && (
                <Badge variant={highlighted ? 'secondary' : 'outline'} className="text-[10px]">
                  Active
                </Badge>
              )}
              {badge && !isCurrentPlan && (
                <Badge variant={highlighted ? 'secondary' : 'default'}>{badge}</Badge>
              )}
            </div>
          </div>
          <div className="flex items-end gap-1">
            <span className={`text-4xl font-bold ${highlighted ? 'text-primary-foreground' : 'text-foreground'}`}>
              {price}
            </span>
            <span className={`text-sm mb-1 ${highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {period}
            </span>
          </div>
          <CardDescription className={highlighted ? 'text-primary-foreground/70' : ''}>
            {desc}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Button
            variant={ctaVariant}
            className="w-full gap-1.5"
            disabled={cta.disabled}
            onClick={cta.onClick}
          >
            {cta.label}
          </Button>
          <ul className="space-y-2.5">
            {features.map(({ label, included }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm">
                {included ? (
                  <Check
                    className={`w-4 h-4 shrink-0 ${highlighted ? 'text-primary-foreground' : ''}`}
                    style={!highlighted ? { color: 'var(--primary)' } : {}}
                  />
                ) : (
                  <X className="w-4 h-4 shrink-0 text-muted-foreground" />
                )}
                <span className={
                  included
                    ? highlighted ? 'text-primary-foreground' : 'text-foreground'
                    : 'text-muted-foreground line-through'
                }>
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Pricing() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--muted)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">No hidden fees. Cancel any time.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          {PLANS.map(plan => (
            <PlanCard key={plan.id} plan={plan} onUpgradeClick={() => setDialogOpen(true)} />
          ))}
        </motion.div>
      </div>

      <UpgradeDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  )
}
