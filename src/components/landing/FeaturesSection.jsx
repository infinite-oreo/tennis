/**
 * [INPUT]: 依赖 framer-motion 动效，依赖 @/components/ui/card · badge，依赖 lucide-react 图标
 * [OUTPUT]: 导出 FeaturesSection Bento 功能展示区（6个特性，不规则网格）
 * [POS]: landing 层核心价值展示，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, BarChart3, CalendarDays, Users, PlayCircle, TrendingUp } from 'lucide-react'
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from '@/lib/motion'

const FEATURES = [
  {
    icon: Zap,
    title: '毫秒级实时比分',
    desc: '比官方网站快 3 倍的数据更新速度，关键分永不错过。支持全部 ATP/WTA 赛事并行追踪。',
    span: 'lg:col-span-2',
    badge: '核心功能',
  },
  {
    icon: BarChart3,
    title: '深度数据分析',
    desc: '发球速度、破发率、ACE 球统计，数据颗粒度达到每分球。',
    span: '',
  },
  {
    icon: CalendarDays,
    title: '智能赛事日历',
    desc: '全年赛程一目了然，比赛开始前 30 分钟自动推送提醒。',
    span: '',
  },
  {
    icon: Users,
    title: '球员深度档案',
    desc: '覆盖 ATP/WTA 1000+ 在役球员，历史战绩、近期状态、技术风格全收录。',
    span: '',
  },
  {
    icon: PlayCircle,
    title: '精彩集锦回放',
    desc: '关键分、破发点、决胜局高光，随时回看不遗漏任何精彩瞬间。',
    span: '',
  },
  {
    icon: TrendingUp,
    title: '世界排名实时',
    desc: '每周积分变动、晋升轨迹、年终总决赛资格竞争态势动态追踪。',
    span: '',
  },
]

function FeatureIcon({ Icon }) {
  return (
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0"
      style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 75%, black) 100%)',
        boxShadow: '0 4px 12px color-mix(in srgb, var(--primary) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
    >
      <Icon className="w-5 h-5 text-primary-foreground" />
    </div>
  )
}

export default function FeaturesSection() {
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
          <Badge variant="secondary" className="mb-4">功能特性</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-4">
            你需要的一切，都在这里
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            从实时比分到深度数据，从赛事提醒到球员档案，一个平台解决所有需求。
          </p>
        </motion.div>

        {/* Bento 网格 */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map(({ icon: Icon, title, desc, span, badge }) => (
            <motion.div key={title} variants={scaleIn} className={span}>
              <Card variant="raised" className="h-full group cursor-default">
                <CardHeader className="pb-2">
                  <FeatureIcon Icon={Icon} />
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    {badge && <Badge variant="default" className="text-xs">{badge}</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
