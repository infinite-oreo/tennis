/**
 * [INPUT]: 依赖 react 的 useMemo · useRef · useState，依赖 framer-motion 的 motion
 * [OUTPUT]: 导出 RankingTrendChart——年终世界排名走势（SVG 面积图），数值越小名次越好，
 *           y 轴按 log10 反转映射（避免头部排名差异在线性坐标下被压缩到看不清）
 * [POS]: analysis 层图表，被 SinnerAnalysisPanel 消费（Pro 门控内容）
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const WIDTH = 640
const HEIGHT = 220
const PAD = { top: 16, right: 12, bottom: 28, left: 12 }

// Catmull-Rom 风格的中点三次贝塞尔平滑——与 WealthGrowthChart 保持同一视觉语言
function buildSmoothPath(points) {
  if (!points.length) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i], p1 = points[i + 1]
    const midX = (p0.x + p1.x) / 2
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`
  }
  return d
}

export default function RankingTrendChart({ trend }) {
  const svgRef = useRef(null)
  const [hoverIndex, setHoverIndex] = useState(null)

  const points = useMemo(() => {
    // log10 映射：排名从 500+ 冲到 1 的跨度巨大，线性坐标会把头部名次差异压扁成一条直线
    const logRanks = trend.map(g => Math.log10(g.rank))
    const maxLog = Math.max(...logRanks) * 1.1 || 1
    const innerW = WIDTH - PAD.left - PAD.right
    const innerH = HEIGHT - PAD.top - PAD.bottom
    return trend.map((g, i) => ({
      ...g,
      x: PAD.left + (i / (trend.length - 1)) * innerW,
      // 排名越小（越好）→ log 值越小 → 越靠近顶部
      y: PAD.top + (Math.log10(g.rank) / maxLog) * innerH,
    }))
  }, [trend])

  const linePath = useMemo(() => buildSmoothPath(points), [points])
  const baseline = HEIGHT - PAD.bottom
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`

  function handleMove(e) {
    const rect = svgRef.current.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH
    let closest = 0, minDist = Infinity
    points.forEach((p, i) => {
      const d = Math.abs(p.x - relX)
      if (d < minDist) { minDist = d; closest = i }
    })
    setHoverIndex(closest)
  }

  const hovered = hoverIndex !== null ? points[hoverIndex] : null

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="ranking-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1={PAD.left} y1={baseline} x2={WIDTH - PAD.right} y2={baseline} stroke="var(--border)" strokeWidth="1" />

        <motion.path
          d={areaPath}
          fill="url(#ranking-area-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        />

        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        />

        {points.map(p => (
          <text key={p.year} x={p.x} y={HEIGHT - 8} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
            {p.year}
          </text>
        ))}

        {hovered && (
          <>
            <line x1={hovered.x} y1={PAD.top} x2={hovered.x} y2={baseline} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={hovered.x} cy={hovered.y} r="5" fill="var(--primary)" stroke="var(--background)" strokeWidth="2" />
          </>
        )}
      </svg>

      {hovered && (
        <div
          className="absolute pointer-events-none rounded-xl px-3 py-1.5 text-xs whitespace-nowrap"
          style={{
            left: `${(hovered.x / WIDTH) * 100}%`,
            top: `${(hovered.y / HEIGHT) * 100}%`,
            transform: 'translate(-50%, -135%)',
            background: 'var(--popover)',
            color: 'var(--popover-foreground)',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <span className="font-semibold">{hovered.year}</span>
          <span className="text-muted-foreground"> · </span>
          <span className="font-bold" style={{ color: 'var(--primary)' }}>No. {hovered.rank}</span>
        </div>
      )}
    </div>
  )
}
