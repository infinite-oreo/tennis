/**
 * [INPUT]: 赛历数据里的 dates 字符串（如 "Jan 12–25, 2026" · "May 25 – Jun 8, 2026" · "Mar 4–16" · "Nov 2026"）
 * [OUTPUT]: 导出 withStatus(events, now)——为每个赛事按日期推算 status（completed | live | upcoming）
 * [POS]: lib 层纯函数，被 EventsPage 消费；让状态由日期涌现，而非手写后过期
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const DEFAULT_YEAR = 2026 // 部分数据省略年份，默认赛季年

const monthIndex = (s) => MONTHS.indexOf(s.slice(0, 3).toLowerCase())

// 解析成 [start, end]（本地时区，end 取当天结束）；无法识别返回 null
export function parseDateRange(dates) {
  const text = dates.replace(/\s+/g, ' ').trim()

  // "Jan 12–25, 2026" · "May 25 – Jun 8, 2026" · "Mar 4–16"
  let m = text.match(/^([A-Za-z]{3,}) (\d{1,2}) ?[–-] ?(?:([A-Za-z]{3,}) )?(\d{1,2})(?:, (\d{4}))?$/)
  if (m) {
    const [, m1, d1, m2, d2, y] = m
    const year = Number(y ?? DEFAULT_YEAR)
    const start = new Date(year, monthIndex(m1), Number(d1))
    const end = new Date(year, monthIndex(m2 ?? m1), Number(d2), 23, 59, 59)
    return [start, end]
  }

  // "Nov 2026"——只知月份，视为整月
  m = text.match(/^([A-Za-z]{3,}) (\d{4})$/)
  if (m) {
    const month = monthIndex(m[1])
    return [new Date(Number(m[2]), month, 1), new Date(Number(m[2]), month + 1, 0, 23, 59, 59)]
  }
  return null
}

export function statusFromDates(dates, now = new Date()) {
  const range = parseDateRange(dates)
  if (!range) return 'upcoming'
  const [start, end] = range
  if (now < start) return 'upcoming'
  if (now <= end) return 'live'
  return 'completed'
}

export const withStatus = (events, now = new Date()) =>
  events.map((e) => ({ ...e, status: statusFromDates(e.dates, now) }))
