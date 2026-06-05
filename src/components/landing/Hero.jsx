/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/button · badge，依赖 @/lib/motion，
 *          依赖 @/components/effects/LiquidEther 的组件 + useDesignTokenColors hook
 * [OUTPUT]: 对外提供 Hero 首屏组件——标题 / CTA / 社会证明 / 数据面板 + 流体着色器背景
 * [POS]: landing 层首屏，视觉优先级最高，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/motion'
import { TrendingUp, Zap, Trophy } from 'lucide-react'
import LiquidEther, { useDesignTokenColors } from '@/components/effects/LiquidEther'

const StatCard = ({ label, value, icon: Icon }) => (
  <motion.div
    variants={fadeInUp}
    className="rounded-2xl border border-border p-4 flex items-center gap-3"
    style={{
      background: 'linear-gradient(160deg, var(--card) 0%, color-mix(in srgb, var(--card) 92%, black) 100%)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
    }}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
      style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 75%, black) 100%)',
        boxShadow: '0 2px 8px color-mix(in srgb, var(--primary) 30%, transparent)',
      }}
    >
      <Icon className="w-4 h-4 text-primary-foreground" />
    </div>
    <div>
      <p className="text-xl font-bold text-foreground leading-none">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  </motion.div>
)

export default function Hero() {
  // 运行时从设计系统 token 提取 hex，供 WebGL 着色器使用
  const fluidColors = useDesignTokenColors(['--primary', '--chart-1', '--accent'])

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <LiquidEther
          colors={fluidColors}
          mouseForce={25}
          cursorSize={120}
          resolution={0.5}
          autoDemo={true}
          autoSpeed={0.25}
          autoIntensity={1.8}
          autoRampDuration={1.2}
          autoResumeDelay={800}
          className="opacity-75"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in srgb, var(--background) 60%, transparent), transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
                🎾 2025 Grand Slam Season — Live Now
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tighter leading-[1.05] mb-6"
            >
              Follow Every
              <br />
              <span style={{ color: 'var(--primary)' }}>Rally.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              Live scores, deep analytics, and match coverage — everything a tennis fan needs.
              From Grand Slams to Challengers, stay on top of every court.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="xl" className="px-10">Get Started Free</Button>
              <Button size="xl" variant="outline" className="px-10">See Features</Button>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-sm text-muted-foreground">
              ✓ No credit card required &nbsp;·&nbsp; ✓ Instant access &nbsp;·&nbsp;{' '}
              <span className="font-semibold text-foreground">50,000+</span> fans already in
            </motion.p>
          </motion.div>

          {/* Right decorative panel */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:flex flex-col gap-4"
          >
            <motion.div
              variants={scaleIn}
              className="rounded-3xl border border-border p-6"
              style={{
                background: 'linear-gradient(160deg, var(--card) 0%, color-mix(in srgb, var(--card) 90%, black) 100%)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Now Playing</p>
                  <p className="text-base font-bold text-foreground">Wimbledon · Men's Final</p>
                </div>
                <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
              </div>
              <div className="flex items-center justify-between py-4 border-t border-border">
                <div className="text-center flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Federer</p>
                  <p className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>3</p>
                  <p className="text-xs text-muted-foreground mt-1">Sets</p>
                </div>
                <div className="text-xl font-bold text-muted-foreground px-4">VS</div>
                <div className="text-center flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Djokovic</p>
                  <p className="text-4xl font-bold text-foreground">2</p>
                  <p className="text-xs text-muted-foreground mt-1">Sets</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                {[['ACE', '12'], ['Breaks', '3'], ['Faults', '4']].map(([k, v]) => (
                  <div key={k} className="text-center">
                    <p className="text-lg font-bold text-foreground">{v}</p>
                    <p className="text-xs text-muted-foreground">{k}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Matches Today" value="24" icon={Trophy} />
              <StatCard label="Live Updates" value="0.1s" icon={Zap} />
              <StatCard label="Fans Online" value="12K" icon={TrendingUp} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
