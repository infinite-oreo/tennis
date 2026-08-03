/**
 * [INPUT]: 依赖 framer-motion，依赖 @/lib/motion 的 springs，依赖 @/data/wealth 的 BIG3_WEALTH
 * [OUTPUT]: 导出 PlayerSwitcher——三张可点击球员卡，受控 activeId + onChange
 * [POS]: wealth 层交互入口，被 WealthPanel 消费，驱动下方所有图表切换
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { springs } from '@/lib/motion'

export default function PlayerSwitcher({ players, activeId, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {players.map(p => {
        const active = p.id === activeId
        return (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => onChange(p.id)}
            whileHover={{ scale: active ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={springs.snappy}
            className="relative rounded-2xl p-4 text-left overflow-hidden"
            style={{
              background: active
                ? 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 85%, black) 50%, color-mix(in srgb, var(--primary) 70%, black) 100%)'
                : 'color-mix(in srgb, var(--muted) 70%, transparent)',
              boxShadow: active
                ? 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15), 0 6px 16px color-mix(in srgb, var(--primary) 35%, transparent)'
                : 'inset 0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <span className="text-2xl leading-none">{p.flag}</span>
            <p
              className="mt-2 text-sm font-bold leading-tight truncate"
              style={{ color: active ? 'var(--primary-foreground)' : 'var(--foreground)' }}
            >
              {p.name}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: active ? 'color-mix(in srgb, var(--primary-foreground) 80%, transparent)' : 'var(--muted-foreground)' }}
            >
              {p.grandSlams} Grand Slams
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
