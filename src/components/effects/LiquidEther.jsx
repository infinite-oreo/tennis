/**
 * [INPUT]: 依赖 three（THREE.Vector4），依赖 ./liquidEther.sim 的 WebGLManager · makePaletteTexture
 * [OUTPUT]: 导出 LiquidEther 全屏流体背景组件，colors/mouseForce/autoDemo 等参数可配置
 * [POS]: effects 层的 React 包裹层，将 liquidEther.sim 的 WebGL 引擎挂载到 DOM 节点；
 *        被 landing/Hero 作为全屏背景消费，pointer-events-none 不阻断交互
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { WebGLManager, makePaletteTexture } from './liquidEther.sim'

// WebGL 需要实际 hex 值，通过 DOM 桥接将 CSS token 转换为 hex
function cssVarToHex(varName) {
  const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  const el = document.createElement('span')
  el.style.color = val
  document.body.appendChild(el)
  const rgb = getComputedStyle(el).color
  document.body.removeChild(el)
  const nums = rgb.match(/\d+/g)
  return nums ? '#' + nums.slice(0, 3).map(n => (+n).toString(16).padStart(2, '0')).join('') : null
}

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = [],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6,
}) {
  const mountRef = useRef(null)
  const webglRef = useRef(null)
  const resizeObserverRef = useRef(null)
  const intersectionObserverRef = useRef(null)
  const resizeRafRef = useRef(null)

  // ── 初始化 WebGL 引擎（props 变化时重建） ─────────────────────────────────────
  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current

    const paletteTex = makePaletteTexture(colors.length ? colors : ['#aaaaaa', '#ffffff'])
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0)

    const webgl = new WebGLManager({
      $wrapper: container,
      paletteTex, bgVec4,
      autoDemo, autoSpeed, autoIntensity,
      takeoverDuration, autoResumeDelay, autoRampDuration,
    })
    webglRef.current = webgl

    const sim = webgl.output?.simulation
    if (sim) Object.assign(sim.options, { mouse_force: mouseForce, cursor_size: cursorSize, isViscous, viscous, iterations_viscous: iterationsViscous, iterations_poisson: iterationsPoisson, dt, BFECC, resolution, isBounce })

    webgl.start()

    // 离屏暂停：节省 GPU 算力
    const io = new IntersectionObserver(entries => {
      const isVisible = entries[0].isIntersecting && entries[0].intersectionRatio > 0
      if (!webglRef.current) return
      webglRef.current.isVisible = isVisible
      isVisible && !document.hidden ? webglRef.current.start() : webglRef.current.pause()
    }, { threshold: [0, 0.01, 0.1] })
    io.observe(container)
    intersectionObserverRef.current = io

    // resize 防抖：避免连续触发引发性能抖动
    const ro = new ResizeObserver(() => {
      if (!webglRef.current) return
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current)
      resizeRafRef.current = requestAnimationFrame(() => { webglRef.current?.resize() })
    })
    ro.observe(container)
    resizeObserverRef.current = ro

    return () => {
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current)
      try { resizeObserverRef.current?.disconnect() } catch { void 0 }
      try { intersectionObserverRef.current?.disconnect() } catch { void 0 }
      webglRef.current?.dispose()
      webglRef.current = null
    }
  }, [colors, autoDemo, autoSpeed, autoIntensity, takeoverDuration, autoResumeDelay, autoRampDuration,
    BFECC, cursorSize, dt, isBounce, isViscous, iterationsPoisson, iterationsViscous, mouseForce, resolution, viscous])

  // ── 热更新仿真参数（不重建 WebGLManager） ─────────────────────────────────────
  useEffect(() => {
    const webgl = webglRef.current
    if (!webgl) return
    const sim = webgl.output?.simulation
    if (!sim) return
    const prevRes = sim.options.resolution
    Object.assign(sim.options, { mouse_force: mouseForce, cursor_size: cursorSize, isViscous, viscous, iterations_viscous: iterationsViscous, iterations_poisson: iterationsPoisson, dt, BFECC, resolution, isBounce })
    if (webgl.autoDriver) {
      webgl.autoDriver.enabled = autoDemo
      webgl.autoDriver.speed = autoSpeed
      webgl.autoDriver.resumeDelay = autoResumeDelay
      webgl.autoDriver.rampDurationMs = autoRampDuration * 1000
      if (webgl.autoDriver.mouse) {
        webgl.autoDriver.mouse.autoIntensity = autoIntensity
        webgl.autoDriver.mouse.takeoverDuration = takeoverDuration
      }
    }
    if (resolution !== prevRes) sim.resize()
  }, [mouseForce, cursorSize, isViscous, viscous, iterationsViscous, iterationsPoisson, dt, BFECC, resolution, isBounce, autoDemo, autoSpeed, autoIntensity, takeoverDuration, autoResumeDelay, autoRampDuration])

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative overflow-hidden pointer-events-none touch-none ${className}`}
      style={style}
    />
  )
}

// ── 辅助 hook：从设计系统 token 提取 hex 颜色供 LiquidEther 使用 ──────────────
export function useDesignTokenColors(tokens) {
  const [colors, setColors] = useState([])
  useEffect(() => {
    const resolved = tokens.map(cssVarToHex).filter(Boolean)
    if (resolved.length) setColors(resolved)
  }, [])
  return colors
}
