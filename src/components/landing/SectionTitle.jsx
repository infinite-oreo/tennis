/**
 * [INPUT]: 依赖 react 的 useState
 * [OUTPUT]: 对外提供 SectionTitle 组件（带 hover 泡泡特效的 section h2 标题）
 * [POS]: landing 层通用标题原语，被各 Section 组件消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'

const BUBBLES = [
  { emoji: '🌸', top: '-16px', left: '2px'  },
  { emoji: '🍀', top: '4px',   left: '22px' },
  { emoji: '🎾', top: '-10px', left: '46px' },
]

export default function SectionTitle({ children, className = '' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className={`mb-4 ${className}`}>
      <div
        className="inline-flex items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter">
          {children}
        </h2>
        <div className="relative shrink-0 ml-3" style={{ width: '80px', height: '36px' }}>
          {BUBBLES.map(({ emoji, top, left }, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center text-base select-none"
              style={{
                top,
                left,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 200ms',
                animation: hovered
                  ? `bubble-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 80}ms both`
                  : 'none',
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
