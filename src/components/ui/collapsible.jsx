/**
 * [INPUT]: 依赖 @radix-ui/react-collapsible 的无障碍折叠原语
 * [OUTPUT]: 导出 Collapsible · CollapsibleTrigger · CollapsibleContent
 * [POS]: ui 层轻量折叠容器，比 Accordion 更简单的单体折叠
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
