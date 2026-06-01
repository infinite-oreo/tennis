/**
 * [INPUT]: checked, onCheckedChange, className
 * [OUTPUT]: 渐变开关组件
 * [POS]: UI基础层 - 布尔值切换原语
 * [DESIGN]: 微拟物 — checked 时 track 用品牌渐变，thumb 用顶部高光模拟球形质感
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const TRACK_CHECKED_STYLE = {
  background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 80%, black) 100%)',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2), inset 0 -1px 0 rgba(255,255,255,0.1)',
}

const Switch = React.forwardRef(({ className, style, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(props.defaultChecked ?? false)
  const checked = props.checked !== undefined ? props.checked : isChecked

  const trackStyle = checked
    ? TRACK_CHECKED_STYLE
    : { boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)' }

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:bg-input",
        className
      )}
      style={{ ...trackStyle, ...style }}
      onCheckedChange={(val) => {
        setIsChecked(val)
        props.onCheckedChange?.(val)
      }}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full ring-0",
          "transition-transform duration-200",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
        style={{
          background: 'linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.9) 100%)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
