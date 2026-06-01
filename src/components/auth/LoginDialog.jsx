/**
 * [INPUT]: 依赖 @/components/ui/dialog 模态原语、@/components/ui/button、react-icons/fc 的 FcGoogle、@/lib/auth 的 signInWithGoogle
 * [OUTPUT]: 对外提供 LoginDialog 组件（自带"登录"触发按钮 + Google OAuth 模态）
 * [POS]: auth 模块的登录入口，未登录态由 AuthControl 渲染；点击触发 Google 授权跳转
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { signInWithGoogle } from '@/lib/auth'

export default function LoginDialog() {
  const [pending, setPending] = useState(false)

  // 点击即跳转 Google；失败才需复位 pending（成功会整页离开）
  const handleGoogle = async () => {
    setPending(true)
    const { error } = await signInWithGoogle()
    if (error) setPending(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">登录</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-xl">欢迎回到 Tennis</DialogTitle>
          <DialogDescription>使用 Google 账号一键登录，开启你的赛事之旅</DialogDescription>
        </DialogHeader>

        {/* FcGoogle 为 Google 官方多彩商标，品牌资产不可重染色 —— 设计系统 token 规则的合法例外 */}
        <Button
          variant="outline"
          size="lg"
          className="w-full mt-2"
          isLoading={pending}
          leftIcon={<FcGoogle className="!size-5" />}
          onClick={handleGoogle}
        >
          使用 Google 继续
        </Button>
      </DialogContent>
    </Dialog>
  )
}
