/**
 * [INPUT]: 无外部依赖，纯 Framer Motion 配置常量
 * [OUTPUT]: 导出 springs 物理预设 · fadeInUp · staggerContainer · scaleIn · slideInLeft · slideInRight
 *           · hoverLift · tapScale · modalContent · pageTransition · viewportConfig
 * [POS]: lib 层动效单一真相源，被所有 landing/layout/page 组件消费，统一 Apple 级动效语言
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ──────────────────────────────────────────────────────────────
 *  SPRING PHYSICS · Apple 级物理引擎
 *  运动从 stiffness/damping/mass 涌现，而非被 duration 钉死。
 *  阻尼区间 25–40：低于 25 弹过头，高于 40 失去生命力。
 * ────────────────────────────────────────────────────────────── */
export const springs = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 },              // 微交互 · 按钮/卡片 hover ~200ms
  gentle: { type: 'spring', stiffness: 300, damping: 35 },              // 柔和过渡 · 面板/进场 ~350ms
  bouncy: { type: 'spring', stiffness: 500, damping: 25, mass: 0.8 },   // 弹性强调 · 成功反馈 ~300ms
  smooth: { type: 'spring', stiffness: 200, damping: 40, mass: 1.2 },   // 优雅落定 · 页面/大元素 ~500ms
  inertia: { type: 'spring', stiffness: 150, damping: 20, mass: 0.5 },  // 惯性滑动 · 列表/轮播
}

/* 退场专用：进场用 Spring，退场用短 duration —— 落定要物理，消失要利落 */
const exitEase = { duration: 0.18, ease: [0.4, 0, 1, 1] }

/* ──────────────────────────────────────────────────────────────
 *  ENTRANCE VARIANTS · 进场动效
 * ────────────────────────────────────────────────────────────── */
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: springs.gentle },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: springs.snappy },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: springs.gentle },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: springs.gentle },
}

/* 序列容器：子元素带阻尼依次弹入，0.06s 间隔营造落定的节奏感 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

/* ──────────────────────────────────────────────────────────────
 *  INTERACTION VARIANTS · 交互动效（hover / tap / modal / route）
 * ────────────────────────────────────────────────────────────── */

/* 悬浮提升 · Apple Card —— 轻盈上浮，阴影加深 */
export const hoverLift = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: springs.snappy },
}

/* 点击回弹 —— 即时下压，紧致手感 */
export const tapScale = {
  rest: { scale: 1 },
  pressed: { scale: 0.96, transition: springs.bouncy },
}

/* 模态框 —— 进场优雅展开，退场利落收束 */
export const modalContent = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springs.gentle },
  exit: { opacity: 0, scale: 0.95, transition: exitEase },
}

/* 页面路由过渡 —— 横向丝滑切换，无突兀感 */
export const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: springs.smooth },
  exit: { opacity: 0, x: -20, transition: exitEase },
}

/* viewport 触发配置：进入视口 100px 后触发一次，避免回滚重放 */
export const viewportConfig = { once: true, margin: '-100px' }
