/**
 * [INPUT]: 依赖 framer-motion，依赖 lucide-react 的 TrendingUp · TrendingDown · Minus，依赖 @/lib/motion
 * [OUTPUT]: 导出 RankRow 组件（排名行，含奖牌渐变 + 趋势图标）
 * [POS]: players 层原子行组件，被 RankingsPanel 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { fadeInUp } from '@/lib/motion'

// 奖牌渐变色从设计系统 token 生成——token 定义在 index.css :root
const MEDAL_GRADIENT = [
  'linear-gradient(135deg, var(--medal-gold),   color-mix(in srgb, var(--medal-gold)   65%, black))',
  'linear-gradient(135deg, var(--medal-silver), color-mix(in srgb, var(--medal-silver) 65%, black))',
  'linear-gradient(135deg, var(--medal-bronze), color-mix(in srgb, var(--medal-bronze) 65%, black))',
]

function TrendIcon({ rank, prev }) {
  const delta = prev - rank
  if (delta > 0) return <TrendingUp  className="w-4 h-4" style={{ color: 'var(--primary)' }} />
  if (delta < 0) return <TrendingDown className="w-4 h-4 text-destructive" />
  return <Minus className="w-4 h-4 text-muted-foreground" />
}

function TrendBadge({ rank, prev }) {
  const delta = prev - rank
  if (delta === 0) return <span className="text-xs text-muted-foreground">—</span>
  const color = delta > 0 ? 'var(--primary)' : 'var(--destructive)'
  return (
    <span className="text-xs font-medium" style={{ color }}>
      {delta > 0 ? '+' : ''}{delta}
    </span>
  )
}

export default function RankRow({ player }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors hover:bg-muted/60"
    >
      <div className="w-8 flex-shrink-0 flex items-center justify-center">
        {player.rank <= 3 ? (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground"
            style={{
              background: MEDAL_GRADIENT[player.rank - 1],
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            {player.rank}
          </div>
        ) : (
          <span className="text-sm font-semibold text-muted-foreground">{player.rank}</span>
        )}
      </div>

      <div className="w-5 flex-shrink-0 flex items-center">
        <TrendIcon rank={player.rank} prev={player.prev} />
      </div>

      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="text-xl leading-none">{player.flag}</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{player.name}</p>
          <p className="text-xs text-muted-foreground">Age {player.age}</p>
        </div>
      </div>

      <div className="w-8 text-right flex-shrink-0">
        <TrendBadge rank={player.rank} prev={player.prev} />
      </div>

      <div className="w-20 text-right flex-shrink-0">
        <span className="text-sm font-bold text-foreground">{player.pts.toLocaleString()}</span>
        <p className="text-xs text-muted-foreground">pts</p>
      </div>
    </motion.div>
  )
}
