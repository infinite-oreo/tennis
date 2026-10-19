/**
 * [INPUT]: 依赖环境变量 LIVETENNIS_API_KEY / SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY，Node 18+ 内置 fetch
 * [OUTPUT]: 将 ATP/WTA 进行中与待开赛比赛 upsert 到 Supabase 的 tennis_fixtures 表，并清理已过期行
 * [POS]: scripts 层的数据搬运工，由 .github/workflows/sync-tennis.yml 定时调用；写入同时充当 Supabase 保活
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 *
 * 用法：node scripts/sync-tennis.mjs [--dry-run]   （dry-run 只拉取与转换，不写库，无需 Supabase 变量）
 */
const API = 'https://api.livetennisapi.com/api/public/v1'
const DRY = process.argv.includes('--dry-run')

const { LIVETENNIS_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env
const need = DRY ? ['LIVETENNIS_API_KEY'] : ['LIVETENNIS_API_KEY', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']
const missing = need.filter((k) => !process.env[k])
if (missing.length) {
  console.error(`缺少环境变量：${missing.join(', ')}`)
  process.exit(1)
}

// ─────────────────────────────────────────────────────────────
// 拉取：4 次请求（live/upcoming × atp/wta），一页 200 条足够
// 任何一次失败都整体中止，绝不在数据不全时清理旧行
// ─────────────────────────────────────────────────────────────
async function fetchMatches(status, tour) {
  const res = await fetch(`${API}/matches?status=${status}&tour=${tour}&limit=200`, {
    headers: { Authorization: `Bearer ${LIVETENNIS_API_KEY}` },
  })
  if (!res.ok) throw new Error(`livetennisapi ${status}/${tour} → HTTP ${res.status}`)
  const body = await res.json()
  if (body.meta?.has_more) console.warn(`⚠️ ${status}/${tour} 超过 200 条，已截断`)
  return body.data ?? []
}

// 只保留面板需要的字段，避免把整份响应塞进数据库
const slimPlayer = (p) => ({ id: p.id, name: p.name, country: p.country, ranking: p.ranking })

function toRow(m) {
  return {
    id: String(m.id),
    kind: m.status, // 'live' | 'upcoming'
    tour: m.tour, // 'atp' | 'wta'
    starts_at: m.scheduled_time,
    payload: {
      tournament: m.tournament,
      round: m.round,
      surface: m.surface,
      court: m.court,
      is_doubles: m.is_doubles,
      players: { p1: slimPlayer(m.players.p1), p2: slimPlayer(m.players.p2) },
      score: m.score
        ? { sets: m.score.sets, games: m.score.games, points: m.score.points, server: m.score.server }
        : null,
    },
  }
}

const combos = [['live', 'atp'], ['live', 'wta'], ['upcoming', 'atp'], ['upcoming', 'wta']]
const rows = (await Promise.all(combos.map(([s, t]) => fetchMatches(s, t)))).flat().map(toRow)
console.log(`拉取完成：${rows.length} 场（live ${rows.filter((r) => r.kind === 'live').length}）`)

if (DRY) {
  console.log(JSON.stringify(rows[0], null, 2))
  process.exit(0)
}

// ─────────────────────────────────────────────────────────────
// 写入：upsert 本轮数据，再删掉 synced_at 早于本轮开始的行（已开赛/已结束的陈旧比赛）
// ─────────────────────────────────────────────────────────────
const runStart = new Date().toISOString()
const rest = `${SUPABASE_URL}/rest/v1/tennis_fixtures`
const auth = { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` }

if (rows.length) {
  const up = await fetch(`${rest}?on_conflict=id`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(rows.map((r) => ({ ...r, synced_at: runStart }))),
  })
  if (!up.ok) throw new Error(`upsert 失败 HTTP ${up.status}: ${await up.text()}`)
}

const del = await fetch(`${rest}?synced_at=lt.${encodeURIComponent(runStart)}`, {
  method: 'DELETE',
  headers: { ...auth, Prefer: 'return=minimal' },
})
if (!del.ok) throw new Error(`清理失败 HTTP ${del.status}: ${await del.text()}`)

console.log(`✅ 已同步 ${rows.length} 场，并清理过期行`)
