/**
 * [INPUT]: 依赖 @/contexts/AuthContext 的 useAuth、@/lib/auth 的 signOut、@/components/ui 的 avatar/dropdown-menu/button、lucide-react 的 LogOut
 * [OUTPUT]: 对外提供 AuthControl 组件（登录态切换：头像菜单 ↔ 登录按钮）
 * [POS]: auth 模块的 Header 控件，单组件吞掉全部登录/未登录分支，被 layout/Header 直接挂载
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { signOut } from '@/lib/auth'
import LoginDialog from './LoginDialog'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

export default function AuthControl() {
  const { user, loading } = useAuth()

  // 状态未定，不渲染，杜绝登录态闪烁
  if (loading) return null

  // 未登录：唯一入口就是登录 Modal
  if (!user) return <LoginDialog />

  // 已登录：头像 + 登出菜单。身份字段一律取自 user_metadata
  const { avatar_url, full_name, name } = user.user_metadata ?? {}
  const display = full_name || name || user.email
  const initial = (display ?? '?').charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="size-9">
            <AvatarImage src={avatar_url} alt={display} />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">{display}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut()}>
          <LogOut className="size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
