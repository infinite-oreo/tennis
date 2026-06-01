/**
 * [INPUT]: variant, className
 * [OUTPUT]: 渐变状态标签
 * [POS]: UI基础层 - 状态/标签原语
 * [VARIANTS]: default · secondary · destructive · accent · outline
 * [DESIGN]: 微拟物 — 三段渐变背景 + 顶部高光 + 底部暗边，圆角 16px
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const BADGE_STYLES = {
  default: {
    background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 85%, black) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
  },
  secondary: {
    background: 'linear-gradient(135deg, var(--secondary) 0%, color-mix(in srgb, var(--secondary) 85%, black) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.06)',
  },
  destructive: {
    background: 'linear-gradient(135deg, var(--destructive) 0%, color-mix(in srgb, var(--destructive) 85%, black) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
  },
  accent: {
    background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 85%, black) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
  },
}

const badgeVariants = cva(
  "inline-flex items-center rounded-2xl border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:     "border-transparent text-primary-foreground",
        secondary:   "border-transparent text-secondary-foreground",
        destructive: "border-transparent text-destructive-foreground",
        accent:      "border-transparent text-accent-foreground",
        outline:     "text-foreground border-border",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({ className, variant = "default", style, ...props }) {
  const styleConfig = BADGE_STYLES[variant]
  const combinedStyle = styleConfig ? { ...styleConfig, ...style } : style

  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      style={combinedStyle}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
