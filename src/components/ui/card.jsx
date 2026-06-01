/**
 * [INPUT]: variant, className
 * [OUTPUT]: 卡片容器组件
 * [POS]: UI基础层 - 内容容器原语
 * [VARIANTS]: default（平面）· raised（凸起）· inset（内凹）· gradient（渐变凸起）
 * [DESIGN]: 微拟物 — raised 用外投影+顶部高光，inset 用内凹阴影，gradient 用品牌色渐变
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const CARD_STYLES = {
  default: {
    boxShadow: '0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
  },
  raised: {
    background: 'linear-gradient(160deg, color-mix(in srgb, var(--card) 100%, white) 0%, var(--card) 60%, color-mix(in srgb, var(--card) 92%, black) 100%)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.05)',
    hoverBoxShadow: '0 12px 32px rgba(0,0,0,0.16), 0 4px 10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.75), inset 0 -1px 0 rgba(0,0,0,0.07)',
  },
  inset: {
    background: 'linear-gradient(160deg, color-mix(in srgb, var(--muted) 100%, black 3%) 0%, var(--muted) 100%)',
    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.12), inset 0 1px 3px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.5)',
  },
  gradient: {
    background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 80%, black) 50%, color-mix(in srgb, var(--primary) 65%, black) 100%)',
    boxShadow: '0 8px 24px color-mix(in srgb, var(--primary) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
    hoverBoxShadow: '0 12px 32px color-mix(in srgb, var(--primary) 40%, transparent), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15)',
  },
}

const cardVariants = cva(
  "rounded-[20px] border text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default:  "bg-card border-border",
        raised:   "bg-card border-border hover:scale-[1.01]",
        inset:    "border-border/50",
        gradient: "border-transparent text-primary-foreground hover:scale-[1.01]",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const Card = React.forwardRef(({ className, variant = "default", style, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const styleConfig = CARD_STYLES[variant]

  const combinedStyle = {
    ...(styleConfig?.background && { background: styleConfig.background }),
    boxShadow: isHovered && styleConfig?.hoverBoxShadow
      ? styleConfig.hoverBoxShadow
      : styleConfig?.boxShadow,
    ...style,
  }

  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
