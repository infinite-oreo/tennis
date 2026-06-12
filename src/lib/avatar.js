/**
 * [INPUT]: 依赖 user.id 字符串（任意 UUID/字符序列）
 * [OUTPUT]: 对外提供 generateAvatarSvg(userId) → SVG data URI string
 * [POS]: lib 层的本地头像生成器，被 auth/AuthControl 消费，零网络依赖
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 *
 * 风格：Claude 同款 —— 纯色圆底 + 简洁几何/植物形状
 * 调色板：8 种低饱和度色调；形状：6 种；总组合 48 种，覆盖绝大多数用户
 */

// ----- 调色板 ---------------------------------------------------------------
// bg: 圆形背景色；shape: 形状色（通常比背景浅，或与背景同色系的深色变体）
const PALETTE = [
  { bg: '#6E9B6E', shape: '#F0EDE4' },  // sage green  → 奶油形状
  { bg: '#BF7A90', shape: '#EAD8E2' },  // dusty rose  → 浅粉形状
  { bg: '#87ABAA', shape: '#5A90B5' },  // sage teal   → 钢蓝形状（如截图 3）
  { bg: '#8B8BAE', shape: '#E0DEF0' },  // soft purple → 淡紫形状
  { bg: '#B08870', shape: '#F0E4DC' },  // warm amber  → 桃色形状
  { bg: '#7090B0', shape: '#DCEAF5' },  // steel blue  → 冰蓝形状
  { bg: '#8A9870', shape: '#EDF0E4' },  // moss green  → 薄荷形状
  { bg: '#AB8878', shape: '#F5EAE4' },  // dusty clay  → 沙色形状
]

// ----- 形状渲染器 ------------------------------------------------------------
// 每个函数接收颜色字符串，返回 SVG 片段（坐标系：40×40 viewBox）

// 4 瓣花 / 四叶草（最接近截图 1 & 2）
function shapeFlower(c) {
  return (
    `<g transform="translate(20,20)">` +
    `<ellipse cx="0" cy="-6.5" rx="4.5" ry="7.5" fill="${c}" opacity="0.92"/>` +
    `<ellipse cx="0" cy="6.5" rx="4.5" ry="7.5" fill="${c}" opacity="0.92"/>` +
    `<ellipse cx="-6.5" cy="0" rx="7.5" ry="4.5" fill="${c}" opacity="0.92"/>` +
    `<ellipse cx="6.5" cy="0" rx="7.5" ry="4.5" fill="${c}" opacity="0.92"/>` +
    `<circle cx="0" cy="0" r="2.5" fill="${c}"/>` +
    `</g>`
  )
}

// 分子网络 / hub-spoke（最接近截图 3，6 辐）
function shapeNetwork(c) {
  const nodes = [
    [0, -9], [7.8, -4.5], [7.8, 4.5],
    [0, 9], [-7.8, 4.5], [-7.8, -4.5],
  ]
  const lines = nodes
    .map(([x, y]) => `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`)
    .join('')
  const dots = nodes
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="${c}"/>`)
    .join('')
  return `<g transform="translate(20,20)"><circle cx="0" cy="0" r="3" fill="${c}"/>${lines}${dots}</g>`
}

// 圆角十字 / Plus
function shapePlus(c) {
  return (
    `<g transform="translate(20,20)">` +
    `<rect x="-4.5" y="-13" width="9" height="26" rx="4.5" fill="${c}" opacity="0.92"/>` +
    `<rect x="-13" y="-4.5" width="26" height="9" rx="4.5" fill="${c}" opacity="0.92"/>` +
    `</g>`
  )
}

// 正六边形
function shapeHex(c) {
  const pts = [0, 60, 120, 180, 240, 300]
    .map(a => {
      const r = (a * Math.PI) / 180
      return `${(Math.cos(r) * 12).toFixed(1)},${(Math.sin(r) * 12).toFixed(1)}`
    })
    .join(' ')
  return `<polygon transform="translate(20,20)" points="${pts}" fill="${c}" opacity="0.92"/>`
}

// 六臂星芒 / 雪花骨架
function shapeStar(c) {
  const arms = [0, 30, 60, 90, 120, 150]
    .map(a => {
      const r = (a * Math.PI) / 180
      return (
        `<line x1="${(Math.cos(r) * 12).toFixed(1)}" y1="${(Math.sin(r) * 12).toFixed(1)}"` +
        ` x2="${(-Math.cos(r) * 12).toFixed(1)}" y2="${(-Math.sin(r) * 12).toFixed(1)}"` +
        ` stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>`
      )
    })
    .join('')
  return `<g transform="translate(20,20)"><circle cx="0" cy="0" r="3" fill="${c}"/>${arms}</g>`
}

// 菱形
function shapeDiamond(c) {
  return (
    `<g transform="translate(20,20)">` +
    `<polygon points="0,-13 10.5,0 0,13 -10.5,0" fill="${c}" opacity="0.92"/>` +
    `</g>`
  )
}

const SHAPES = [shapeFlower, shapeNetwork, shapePlus, shapeHex, shapeStar, shapeDiamond]

// ----- 哈希 -----------------------------------------------------------------
function hash(str) {
  let h = 0
  for (const ch of str) h = ((Math.imul(31, h) + ch.charCodeAt(0)) | 0)
  return h >>> 0
}

// ----- 公共 API -------------------------------------------------------------
export function generateAvatarSvg(userId) {
  if (!userId) return null
  const h = hash(userId)
  const { bg, shape } = PALETTE[h % PALETTE.length]
  const shapeFn = SHAPES[(h >>> 4) % SHAPES.length]

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">` +
    `<circle cx="20" cy="20" r="20" fill="${bg}"/>` +
    shapeFn(shape) +
    `</svg>`

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
