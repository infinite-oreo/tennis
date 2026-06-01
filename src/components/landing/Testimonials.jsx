/**
 * [INPUT]: 依赖 framer-motion 动效，依赖 @/components/ui/card · avatar · badge
 * [OUTPUT]: 导出 Testimonials 用户评价区（3列网格，带装饰引号和星级评分）
 * [POS]: landing 层社会证明，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

const TESTIMONIALS = [
  {
    quote: '终于不用在十几个 App 之间来回切换了。实时比分、球员数据、赛事日历全在一个地方，真的救了我。',
    author: '李明',
    role: '资深球迷',
    company: '北京',
    initials: 'LM',
  },
  {
    quote: 'Federer 每场比赛我一场不落。推送通知精准到每个关键分，深度数据让我看比赛的方式彻底变了。',
    author: '王芳',
    role: '网球教练',
    company: '上海网球俱乐部',
    initials: 'WF',
  },
  {
    quote: '数据分析功能超出预期。发球速度、破发率的可视化让我作为教练能更好地分析对手，强烈推荐。',
    author: '陈刚',
    role: '业余球手',
    company: '广州',
    initials: 'CG',
  },
]

const Stars = () => (
  <div className="flex gap-0.5 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'var(--accent)' }} />
    ))}
  </div>
)

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4">用户评价</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-4">
            球迷们怎么说
          </h2>
          <p className="text-lg text-muted-foreground">50,000+ 真实用户的选择。</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map(({ quote, author, role, company, initials }) => (
            <motion.div key={author} variants={fadeInUp}>
              <Card variant="raised" className="h-full">
                <CardContent className="pt-6 flex flex-col gap-4">
                  <Stars />
                  {/* 装饰引号 */}
                  <div
                    className="text-6xl font-serif leading-none -mb-4 -mt-2"
                    style={{ color: 'var(--primary)', opacity: 0.3 }}
                  >
                    "
                  </div>
                  <p className="text-sm leading-relaxed text-foreground flex-1">
                    {quote}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-xs font-bold">{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{author}</p>
                      <p className="text-xs text-muted-foreground">{role} · {company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
