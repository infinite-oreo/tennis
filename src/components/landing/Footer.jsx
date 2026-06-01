/**
 * [INPUT]: 依赖 react-router-dom 的 Link，依赖 @/components/ui/separator，依赖 lucide-react 社媒图标
 * [OUTPUT]: 导出 LandingFooter 落地页专属底部（4列导航 + 版权 + 社交链接）
 * [POS]: landing 层底部，与 layout/Footer 并列存在，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { X, Globe, MessageCircle, Video } from 'lucide-react'

const NAV = {
  产品: ['实时比分', '球员数据', '赛事日历', '精彩集锦', '排名追踪'],
  资源: ['帮助中心', '开发者 API', '更新日志', '状态页面'],
  公司: ['关于我们', '加入我们', '新闻媒体', '联系我们'],
  法律: ['隐私政策', '使用条款', 'Cookie 设置'],
}

const SOCIALS = [
  { icon: X, label: 'X (Twitter)' },
  { icon: Globe, label: 'Website' },
  { icon: MessageCircle, label: 'Discord' },
  { icon: Video, label: 'YouTube' },
]

export default function LandingFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* 品牌栏 */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary block mb-3">Tennis</Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              网球世界，尽在掌握。<br />全球 50,000+ 球迷的选择。
            </p>
          </div>

          {/* 链接列 */}
          {Object.entries(NAV).map(([title, links]) => (
            <div key={title}>
              <p className="text-sm font-semibold text-foreground mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Tennis. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                to="#"
                aria-label={label}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
