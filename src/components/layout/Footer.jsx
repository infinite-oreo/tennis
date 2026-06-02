/**
 * [INPUT]: depends on @/components/ui/separator, react-router-dom Link
 * [OUTPUT]: exports Footer layout component — product/about/legal nav links + copyright
 * [POS]: layout layer bottom bar, globally mounted by App.jsx
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'

const links = {
  Product: ['Events', 'Players', 'Rankings', 'Live'],
  About:   ['About Us', 'Contact', 'Careers'],
  Legal:   ['Privacy Policy', 'Terms of Service'],
}

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="text-xl font-bold text-primary mb-3">Tennis</p>
            <p className="text-sm text-muted-foreground">
              Global tennis scores, stats & data.
            </p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-sm font-semibold text-foreground mb-3">{category}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
          <p className="text-sm text-muted-foreground">© 2025 Tennis. All rights reserved.</p>
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
