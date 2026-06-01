/**
 * [INPUT]: 依赖 react-router-dom 的 Link/useLocation，依赖 @/components/ui/button 和 separator，依赖 @/components/auth/AuthControl 的登录控件
 * [OUTPUT]: 导出 Header 布局组件，含导航链接与登录状态控件
 * [POS]: layout 层顶部导航，sticky 定位，被 App.jsx 全局挂载
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import AuthControl from '@/components/auth/AuthControl'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: '首页', to: '/' },
  { label: '赛事', to: '/events' },
  { label: '球员', to: '/players' },
  { label: 'Design System', to: '/design-system' },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary tracking-tight">
          Tennis
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, to }) => (
            <Link key={to} to={to}>
              <Button
                variant={pathname === to ? 'secondary' : 'ghost'}
                size="sm"
                className={cn(pathname === to && 'font-semibold')}
              >
                {label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AuthControl />
        </div>
      </div>
      <Separator />
    </header>
  )
}
