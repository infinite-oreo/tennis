/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/card · avatar · badge，依赖 SectionTitle
 * [OUTPUT]: 对外提供 Testimonials 用户评价区（3 列网格，真人头像 + 时间戳 + 4-5 星评分）
 * [POS]: landing 层社会证明区，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'
import SectionTitle from '@/components/landing/SectionTitle'

const TESTIMONIALS = [
  {
    quote: "Finally ditched my three-app setup. Live scores load instantly, the push alerts hit right at match point, and the ATP draw is actually readable. Deleted ESPN and FlashScore.",
    author: 'Michael Thompson',
    role: 'Die-Hard Tennis Fan · Chicago, IL',
    rating: 5,
    date: '3 days ago',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    quote: "I coach at a club and use the serve-speed breakdowns every week. My players can finally SEE why their second serve gets attacked. Worth every penny of the Pro plan.",
    author: 'Sophie Müller',
    role: 'Head Coach · Hamburg Tennis Club',
    rating: 4,
    date: '1 week ago',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    quote: "Best tennis app I've used. The opponent scouting tool alone saved me two matches at my last ITF. Break-point rates, return depth charts — it's all here.",
    author: 'Diego Martínez',
    role: 'Amateur Player · Barcelona, Spain',
    rating: 5,
    date: 'Mar 2025',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          style={{
            fill: i < count ? 'var(--primary)' : 'transparent',
            color: i < count ? 'var(--primary)' : 'var(--muted-foreground)',
          }}
        />
      ))}
    </div>
  )
}

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
          <SectionTitle>What fans are saying</SectionTitle>
          <p className="text-lg text-muted-foreground">Loved by 50,000+ tennis fans worldwide.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map(({ quote, author, role, rating, date, avatar }) => (
            <motion.div key={author} variants={fadeInUp}>
              <Card variant="raised" className="h-full">
                <CardContent className="pt-5 flex flex-col gap-3">

                  {/* 星级 + 时间戳 */}
                  <div className="flex items-center justify-between">
                    <Stars count={rating} />
                    <span className="text-xs text-muted-foreground">{date}</span>
                  </div>

                  {/* 评论正文 */}
                  <p className="text-sm leading-relaxed text-foreground flex-1">"{quote}"</p>

                  {/* 用户信息 */}
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <Avatar className="w-10 h-10 shrink-0">
                      <AvatarImage src={avatar} alt={author} />
                      <AvatarFallback className="text-xs font-bold">
                        {author.split(' ').map(w => w[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight">{author}</p>
                      <p className="text-xs text-muted-foreground truncate">{role}</p>
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
