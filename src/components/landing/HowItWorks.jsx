/**
 * [INPUT]: 依赖 framer-motion 动效，依赖 @/components/ui/badge，依赖 @/lib/motion 预设
 * [OUTPUT]: 导出 HowItWorks 流程步骤区（3步，带连接线和顺序 reveal）
 * [POS]: landing 层使用流程说明，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { UserPlus, Star, BellRing } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

const STEPS = [
  {
    icon: UserPlus,
    title: '注册账户',
    desc: '30 秒完成注册，无需信用卡。立刻获得基础功能全访问权限。',
  },
  {
    icon: Star,
    title: '关注你的偶像',
    desc: '从 1000+ 球员中选择关注对象，设置你感兴趣的赛事和球员。',
  },
  {
    icon: BellRing,
    title: '实时推送到你',
    desc: '比赛开始、关键分、比赛结束 —— 所有重要时刻第一时间通知你。',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--muted)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">使用流程</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-4">
            三步，立刻开始
          </h2>
          <p className="text-lg text-muted-foreground">简单到不需要教程。</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* 连接虚线（仅桌面端） */}
          <div className="hidden md:block absolute top-10 left-[calc(33%+1rem)] right-[calc(33%+1rem)] border-t-2 border-dashed border-border" />

          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              {/* 步骤圆圈 */}
              <div
                className="w-20 h-20 rounded-full flex flex-col items-center justify-center mb-6 relative z-10"
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 75%, black) 100%)',
                  boxShadow: '0 8px 24px color-mix(in srgb, var(--primary) 35%, transparent), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                <Icon className="w-7 h-7 text-primary-foreground" />
                <span className="text-[10px] text-primary-foreground/70 font-bold mt-0.5">0{i + 1}</span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
