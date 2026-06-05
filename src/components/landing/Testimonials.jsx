/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/card · avatar · badge
 * [OUTPUT]: 对外提供 Testimonials 用户评价区（3 列网格，引号装饰 + 星级评分）
 * [POS]: landing 层社会证明区，被 LandingPage.jsx 消费
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
    quote: "Finally — I don't have to juggle ten different apps anymore. Live scores, player stats, and the full schedule all in one spot. It's a game-changer.",
    author: 'Michael Thompson',
    role: 'Die-Hard Tennis Fan',
    company: 'Chicago, IL',
    initials: 'MT',
  },
  {
    quote: "I never miss a Sinner match now. The push alerts are spot-on for every key point, and the analytics have completely changed how I watch the game.",
    author: 'Sophie Müller',
    role: 'Tennis Coach',
    company: 'Hamburg Tennis Club',
    initials: 'SM',
  },
  {
    quote: 'The data analysis blew me away. Serve speed, break-point rates, all visualized beautifully. As a coach, it gives me an edge when scouting opponents.',
    author: 'Diego Martínez',
    role: 'Amateur Player',
    company: 'Barcelona, Spain',
    initials: 'DM',
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
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-4">
            What fans are saying
          </h2>
          <p className="text-lg text-muted-foreground">Loved by 50,000+ tennis fans worldwide.</p>
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
                  <div
                    className="text-6xl font-serif leading-none -mb-4 -mt-2"
                    style={{ color: 'var(--primary)', opacity: 0.3 }}
                  >
                    "
                  </div>
                  <p className="text-sm leading-relaxed text-foreground flex-1">{quote}</p>
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
