/**
 * [INPUT]: 依赖 framer-motion 动效，依赖 @/components/ui/card · button · badge，依赖 lucide-react
 * [OUTPUT]: 导出 Pricing 定价方案区（3 档，中间高亮放大，含 Check/X 功能对比）
 * [POS]: landing 层转化关键区，被 LandingPage.jsx 消费
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
    name: '免费版',
    price: '¥0',
    period: '永久免费',
    desc: '入门球迷的最佳起点',
    cta: '免费开始',
    ctaVariant: 'outline',
    highlighted: false,
    features: [
      { label: '5 场比赛实时比分/月', included: true },
      { label: '基础赛事日历', included: true },
      { label: '球员基础资料', included: true },
      { label: '深度数据分析', included: false },
      { label: '无限推送通知', included: false },
      { label: '精彩集锦回放', included: false },
      { label: '无广告体验', included: false },
    ],
  },
  {
    name: 'Pro 版',
    price: '¥38',
    period: '/月',
    desc: '认真球迷的全能之选',
    cta: '立刻升级',
    ctaVariant: 'default',
    highlighted: true,
    badge: '最受欢迎',
    features: [
      { label: '无限实时比分追踪', included: true },
      { label: '完整赛事日历', included: true },
      { label: '1000+ 球员深度档案', included: true },
      { label: '深度数据分析', included: true },
      { label: '无限推送通知', included: true },
      { label: '精彩集锦回放', included: true },
      { label: '无广告体验', included: true },
    ],
  },
  {
    name: '团队版',
    price: '¥88',
    period: '/月',
    desc: '俱乐部与专业教练专属',
    cta: '联系我们',
    ctaVariant: 'secondary',
    highlighted: false,
    features: [
      { label: '所有 Pro 功能', included: true },
      { label: '最多 10 个账号', included: true },
      { label: '高清集锦下载', included: true },
      { label: '专属客服支持', included: true },
      { label: 'API 数据接入', included: true },
      { label: '定制数据报告', included: true },
      { label: '优先新功能抢鲜', included: true },
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
          <Badge variant="secondary" className="mb-4">定价方案</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-4">
            简单透明，按需选择
          </h2>
          <p className="text-lg text-muted-foreground">无隐藏费用，随时可取消。</p>
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
                  <Button
                    variant={highlighted ? 'secondary' : ctaVariant}
                    className="w-full"
                  >
                    {cta}
                  </Button>
                  <ul className="space-y-2.5">
                    {features.map(({ label, included }) => (
                      <li key={label} className="flex items-center gap-2.5 text-sm">
                        {included ? (
                          <Check className={`w-4 h-4 shrink-0 ${highlighted ? 'text-primary-foreground' : ''}`}
                            style={!highlighted ? { color: 'var(--primary)' } : {}} />
                        ) : (
                          <X className="w-4 h-4 shrink-0 text-muted-foreground" />
                        )}
                        <span className={included
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
