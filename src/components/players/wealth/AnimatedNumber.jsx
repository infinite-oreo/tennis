/**
 * [INPUT]: 依赖 framer-motion 的 useSpring · useTransform · motion
 * [OUTPUT]: 导出 AnimatedNumber 组件——数值变化时以 Spring 物理滚动过渡，而非瞬间跳变
 * [POS]: wealth 层通用原子，被 WealthPanel 头部大数字与 AllocationBars 金额消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { springs } from '@/lib/motion'

/**
 * @param {number} value  - 目标数值
 * @param {string} prefix - 前缀（如 "$"）
 * @param {string} suffix - 后缀（如 "M"）
 */
export default function AnimatedNumber({ value, prefix = '', suffix = '', className = '' }) {
  const spring = useSpring(value, springs.smooth)
  const display = useTransform(spring, v => `${prefix}${Math.round(v).toLocaleString()}${suffix}`)

  useEffect(() => { spring.set(value) }, [value, spring])

  return <motion.span className={className}>{display}</motion.span>
}
