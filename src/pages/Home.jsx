/**
 * [INPUT]: 依赖 @/components/layout/Hero 的首屏英雄区
 * [OUTPUT]: 导出 Home 页面组件，路由 "/home"
 * [POS]: pages 层旧首页，落地页上线后降级备用，被 App.jsx 的 Route path="/home" 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import Hero from '@/components/layout/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  )
}
