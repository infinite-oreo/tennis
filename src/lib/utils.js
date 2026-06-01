/**
 * [INPUT]: 依赖 clsx 的条件类名合并，依赖 tailwind-merge 的 Tailwind 冲突解决
 * [OUTPUT]: 导出 cn(...inputs) 工具函数
 * [POS]: lib 层唯一工具函数，被全项目所有组件消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
