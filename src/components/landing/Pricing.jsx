/**
 * [INPUT]: depends on framer-motion, @/components/ui/card · button · badge, lucide-react
 * [OUTPUT]: exports Pricing section (3 tiers, center highlighted, Check/X feature comparison)
 * [POS]: landing layer conversion section, consumed by LandingPage.jsx
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from '@/lib/motion'

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'The perfect starting point for casual fans.',
    cta: 'Get Started Free',
    ctaVariant: 'outline',
    highlighted: false,
    features: [
      { label: '5 live scores per month',         included: true  },
      { label: 'Basic match schedule',             included: true  },
      { label: 'Player profiles',                  included: true  },
      { label: 'Deep analytics',                   included: false },
      { label: 'Unlimited push alerts',            included: false },
      { label: 'Match highlights',                 included: false },
      { label: 'Ad-free experience',               included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/mo',
    desc: 'Everything a serious tennis fan needs.',
    cta: 'Upgrade to Pro',
    ctaVariant: 'default',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { label: 'Unlimited live score tracking',   included: true },
      { label: 'Full match schedule',             included: true },
      { label: '1,000+ player deep profiles',    included: true },
      { label: 'Deep analytics',                  included: true },
      { label: 'Unlimited push alerts',           included: true },
      { label: 'Match highlights',                included: true },
      { label: 'Ad-free experience',              included: true },
    ],
  },
  {
    name: 'Team',
    price: '$19.99',
    period: '/mo',
    desc: 'Built for clubs, academies, and coaches.',
    cta: 'Contact Us',
    ctaVariant: 'secondary',
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

export default function Pricing() {
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
          {PLANS.map(({ name, price, period, desc, cta, ctaVariant, highlighted, badge, features }) => (
            <motion.div key={name} variants={scaleIn} className={highlighted ? 'md:-mt-4' : ''}>
              <Card
                variant={highlighted ? 'gradient' : 'raised'}
                className={`h-full ${highlighted ? 'ring-2 ring-primary' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className={`text-lg ${highlighted ? 'text-primary-foreground' : ''}`}>
                      {name}
                    </CardTitle>
                    {badge && <Badge variant={highlighted ? 'secondary' : 'default'}>{badge}</Badge>}
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
                  <Button variant={highlighted ? 'secondary' : ctaVariant} className="w-full">
                    {cta}
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
          ))}
        </motion.div>
      </div>
    </section>
  )
}
