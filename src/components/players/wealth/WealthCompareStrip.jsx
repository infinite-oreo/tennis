/**
 * [INPUT]: 依赖 framer-motion，依赖 @/lib/motion 的 springs
 * [OUTPUT]: 导出 WealthCompareStrip——三人净值横向对比条，当前选中高亮，点击可切换球员
 * [POS]: wealth 层辅助图表，被 WealthPanel 消费，与 PlayerSwitcher 共享 activeId 状态（双入口切换）
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { springs } from '@/lib/motion'

export default function WealthCompareStrip({ players, activeId, onChange }) {
  const maxTotal = Math.max(...players.map(p => p.totalM))

  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{ background: 'color-mix(in srgb, var(--muted) 50%, transparent)' }}
    >
      <p className="text-xs font-medium text-muted-foreground">Net Worth Comparison</p>
      {players.map(p => {
        const active = p.id === activeId
        const pct = Math.round((p.totalM / maxTotal) * 100)
        return (
          <button key={p.id} type="button" onClick={() => onChange(p.id)} className="w-full text-left block">
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className={active ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                {p.flag} {p.name}
              </span>
              <span className={active ? 'font-bold text-foreground' : 'text-muted-foreground'}>${p.totalM}M</span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: 'color-mix(in srgb, var(--muted-foreground) 15%, transparent)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: active ? 'var(--primary)' : 'color-mix(in srgb, var(--muted-foreground) 35%, transparent)' }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={springs.smooth}
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}
