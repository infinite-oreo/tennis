/**
 * [INPUT]: 依赖 framer-motion 动效，依赖 @/components/ui/button · badge，依赖 @/lib/motion 预设，依赖 @/components/effects/LiquidEther WebGL 流体背景
 * [OUTPUT]: 导出 Hero 首屏组件，含标题/CTA/社会证明/统计面板装饰 + 流体着色器背景
 * [POS]: landing 层第一屏，视觉优先级最高，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/motion'
import { TrendingUp, Zap, Trophy } from 'lucide-react'
import LiquidEther from '@/components/effects/LiquidEther'

/* 运行时读取 CSS oklch token → THREE.Color 兼容的 hex 字符串 */
function cssVarToHex(varName) {
  const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const el = document.createElement('span');
  el.style.color = val;
  document.body.appendChild(el);
  const rgb = getComputedStyle(el).color;
  document.body.removeChild(el);
  const nums = rgb.match(/\d+/g);
  if (!nums) return '#3a8a44';
  return '#' + nums.slice(0, 3).map(n => (+n).toString(16).padStart(2, '0')).join('');
}

/* ── 装饰性统计面板 ── */
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
  /* 从设计系统 token 读取调色板：primary → chart-1 → accent（深→中→浅绿） */
  const [fluidColors, setFluidColors] = useState(['#3a7a44', '#52b864', '#a8deb8']);
  useEffect(() => {
    setFluidColors([
      cssVarToHex('--primary'),
      cssVarToHex('--chart-1'),
      cssVarToHex('--accent'),
    ]);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background">
      {/* WebGL 流体背景：基于 Navier-Stokes 方程，颜色来自设计系统 token */}
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

      {/* 顶部光晕：增强文案可读性 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in srgb, var(--background) 60%, transparent), transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── 左侧文案 ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
                🎾 2025 大满贯赛季进行中
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tighter leading-[1.05] mb-6"
            >
              追踪每一场
              <br />
              <span style={{ color: 'var(--primary)' }}>胜负</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              实时比分、深度数据、赛事直播 —— 让每一位球迷都成为真正的行家。
              从大满贯到挑战赛，一站掌握全球顶级赛事动态。
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="xl" className="px-10">免费开始</Button>
              <Button size="xl" variant="outline" className="px-10">查看功能</Button>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-sm text-muted-foreground">
              ✓ 无需信用卡 &nbsp;·&nbsp; ✓ 即刻访问 &nbsp;·&nbsp; 已有{' '}
              <span className="font-semibold text-foreground">50,000+</span> 球迷加入
            </motion.p>
          </motion.div>

          {/* ── 右侧装饰面板 ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:flex flex-col gap-4"
          >
            {/* 主卡片 */}
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
                  <p className="text-xs text-muted-foreground">正在直播</p>
                  <p className="text-base font-bold text-foreground">温布尔登 · 男单决赛</p>
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
                {[['ACE', '12'], ['破发', '3'], ['双误', '4']].map(([k, v]) => (
                  <div key={k} className="text-center">
                    <p className="text-lg font-bold text-foreground">{v}</p>
                    <p className="text-xs text-muted-foreground">{k}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 统计小卡片 */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="今日赛事" value="24" icon={Trophy} />
              <StatCard label="实时更新" value="0.1s" icon={Zap} />
              <StatCard label="在线球迷" value="12K" icon={TrendingUp} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
