/**
 * [INPUT]: 依赖 @/lib/utils 的 cn
 * [OUTPUT]: 导出 TourSwitcher（ATP / WTA 切换按钮组）
 * [POS]: players 层 UI 控件，被 PlayersPage 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { cn } from '@/lib/utils'

const TOURS = [
  { id: 'atp', label: "ATP Men's"   },
  { id: 'wta', label: "WTA Women's" },
]

export default function TourSwitcher({ value, onChange }) {
  return (
    <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
      {TOURS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-semibold transition-all',
            value === id ? 'bg-background text-foreground shadow-sm' : 'hover:text-foreground'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
