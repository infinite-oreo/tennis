/**
 * [INPUT]: 依赖 @/components/ui/separator，依赖 react-router-dom 的 Link
 * [OUTPUT]: 导出 Footer 布局组件，含产品/关于/法律链接和版权信息
 * [POS]: layout 层底部，被 App.jsx 全局挂载
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'

const links = {
  产品: ['赛事', '球员', '排名', '直播'],
  关于: ['关于我们', '联系我们', '加入我们'],
  法律: ['隐私政策', '使用条款'],
}

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="text-xl font-bold text-primary mb-3">Tennis</p>
            <p className="text-sm text-muted-foreground">
              全球网球资讯与数据平台
            </p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-sm font-semibold text-foreground mb-3">{category}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
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
          <Link to="/design-system">
            <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Design System →
            </span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
