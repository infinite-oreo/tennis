/**
 * [INPUT]: type, className
 * [OUTPUT]: 内凹文本输入框
 * [POS]: UI基础层 - 表单输入原语
 * [DESIGN]: 微拟物 — inset 阴影模拟按压内凹，focus 时高光边框强化反馈
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import * as React from "react"
import { cn } from "@/lib/utils"

const INPUT_STYLE = {
  background: 'linear-gradient(160deg, color-mix(in srgb, var(--input) 100%, black 4%) 0%, var(--input) 100%)',
  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1), inset 0 1px 3px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.5)',
}

const Input = React.forwardRef(({ className, type, style, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-[16px] border border-input px-3 py-2",
        "text-base text-foreground placeholder:text-muted-foreground",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "md:text-sm",
        className
      )}
      style={{ ...INPUT_STYLE, ...style }}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
