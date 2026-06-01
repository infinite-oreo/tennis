/**
 * [INPUT]: 依赖 framer-motion 动效，依赖 @/components/ui/button · badge
 * [OUTPUT]: 导出 FinalCTA 底部召唤行动区（品牌渐变背景 + 双按钮）
 * [POS]: landing 层最终转化区，紧接 FAQ 之后，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* 渐变背景 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 80%, black) 50%, color-mix(in srgb, var(--primary) 60%, black) 100%)',
        }}
      />
      {/* 装饰光斑 */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tighter mb-6"
          >
            今天就成为真正的行家
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            加入 50,000+ 球迷，永不错过任何精彩时刻。
            免费开始，随时升级，随时取消。
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="xl"
              variant="secondary"
              className="px-12"
            >
              免费开始
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="px-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              联系我们
            </Button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-sm text-primary-foreground/60"
          >
            ✓ 无需信用卡 &nbsp;·&nbsp; ✓ 30 秒完成注册 &nbsp;·&nbsp; ✓ 随时取消
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
