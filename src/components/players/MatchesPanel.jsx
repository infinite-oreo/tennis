/**
 * [INPUT]: 依赖 react，依赖 framer-motion，依赖 @/lib/supabase，依赖 @/lib/motion，依赖 @/components/ui/badge
 * [OUTPUT]: 导出 MatchesPanel（ATP/WTA 进行中 + 待开赛比赛，数据来自 Supabase tennis_fixtures）
 * [POS]: players 层赛程面板，被 PlayersPage 的 TabsContent 消费；数据由 scripts/sync-tennis.mjs 定时写入
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { staggerContainer, fadeInUp } from '@/lib/motion'
import { Badge } from '@/components/ui/badge'

const UPCOMING_LIMIT = 30

const formatTime = (iso) =>
  new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

function PlayerLine({ player, sets }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex-1 truncate text-sm font-medium text-foreground">{player.name}</span>
      {player.ranking && <span className="text-xs text-muted-foreground">#{player.ranking}</span>}
      {sets?.map((g, i) => (
        <span key={i} className="w-5 text-center text-sm font-semibold text-foreground">{g}</span>
      ))}
    </div>
  )
}

function MatchRow({ match }) {
  const { tournament, round, surface, players, score } = match.payload
  const live = match.kind === 'live'
  return (
    <motion.div variants={fadeInUp} className="px-4 py-3 rounded-2xl transition-colors hover:bg-muted/60">
      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
        {live
          ? <Badge variant="destructive">LIVE</Badge>
          : <Badge variant="outline">{formatTime(match.starts_at)}</Badge>}
        <span className="truncate">{tournament} · {round?.split(' - ').pop()}</span>
        {surface && <span className="ml-auto capitalize">{surface}</span>}
      </div>
      <PlayerLine player={players.p1} sets={score?.games?.[0]} />
      <PlayerLine player={players.p2} sets={score?.games?.[1]} />
    </motion.div>
  )
}

export default function MatchesPanel({ tour }) {
  const [rows, setRows]   = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    supabase
      .from('tennis_fixtures')
      .select('id, kind, starts_at, payload')
      .eq('tour', tour)
      .order('starts_at', { ascending: true })
      .then(({ data, error: err }) => {
        if (cancelled) return
        setError(Boolean(err))
        setRows(data ?? [])
      })
    return () => { cancelled = true }
  }, [tour])

  if (rows === null) return <p className="p-8 text-center text-sm text-muted-foreground">Loading matches…</p>
  if (error)         return <p className="p-8 text-center text-sm text-destructive">Couldn&apos;t load matches. Please try again later.</p>

  const live     = rows.filter(r => r.kind === 'live')
  const upcoming = rows.filter(r => r.kind === 'upcoming').slice(0, UPCOMING_LIMIT)
  if (!live.length && !upcoming.length) {
    return <p className="p-8 text-center text-sm text-muted-foreground">No matches scheduled right now.</p>
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-1">
      {live.length > 0 && <h3 className="px-4 pt-2 text-xs font-semibold text-muted-foreground">Live now</h3>}
      {live.map(m => <MatchRow key={m.id} match={m} />)}
      {upcoming.length > 0 && <h3 className="px-4 pt-3 text-xs font-semibold text-muted-foreground">Upcoming</h3>}
      {upcoming.map(m => <MatchRow key={m.id} match={m} />)}
    </motion.div>
  )
}
