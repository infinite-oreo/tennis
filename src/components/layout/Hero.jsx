/**
 * [INPUT]: 依赖 framer-motion 的入场动效，依赖 @/components/ui/button 和 badge
 * [OUTPUT]: 导出 Hero 首屏英雄区组件，含标题、副标题、CTA 按钮
 * [POS]: layout 层首屏，仅被 pages/Home.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-6">
            2025 赛季火热进行中
          </Badge>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          网球的世界
          <br />
          <span className="text-primary">尽在掌握</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          追踪顶级赛事、球员数据与实时比分，从大满贯到挑战赛，一站掌握全球网球动态。
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" className="px-8">探索赛事</Button>
          <Button size="lg" variant="outline" className="px-8">查看球员</Button>
        </motion.div>
      </div>
    </section>
  )
}
