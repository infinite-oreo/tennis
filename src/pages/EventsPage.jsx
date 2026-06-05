/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/badge · card · tabs · button，依赖 @/lib/motion
 * [OUTPUT]: 导出 EventsPage——2026 赛季全日历（大满贯 + ATP/WTA 大师赛 + 年终赛）
 * [POS]: pages 层，路由 "/events"，被 App.jsx 的 Route 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Trophy, ExternalLink, Zap } from 'lucide-react'
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from '@/lib/motion'

// ── 球场材质 token 映射 ────────────────────────────────────────────────────────
const SURFACE_STYLE = {
  Hard:  { bg: 'var(--surface-hard)',  label: 'Hard' },
  Clay:  { bg: 'var(--surface-clay)',  label: 'Clay' },
  Grass: { bg: 'var(--surface-grass)', label: 'Grass' },
}

// ── 2026 赛历数据 ─────────────────────────────────────────────────────────────
const GRAND_SLAMS = [
  {
    name: 'Australian Open',
    dates: 'Jan 12–25, 2026',
    location: 'Melbourne Park, Australia',
    surface: 'Hard',
    prize: 'AUD $96.5M',
    status: 'completed',
    atpWinner: 'Jannik Sinner',
    wtaWinner: 'Aryna Sabalenka',
    url: 'https://www.ausopen.com',
    draws: { singles: 128, doubles: 64 },
  },
  {
    name: 'Roland Garros',
    dates: 'May 25 – Jun 8, 2026',
    location: 'Stade Roland Garros, Paris',
    surface: 'Clay',
    prize: '€56.8M',
    status: 'live',
    url: 'https://www.rolandgarros.com',
    draws: { singles: 128, doubles: 64 },
  },
  {
    name: 'Wimbledon',
    dates: 'Jun 29 – Jul 12, 2026',
    location: 'All England Club, London',
    surface: 'Grass',
    prize: '£50M',
    status: 'upcoming',
    url: 'https://www.wimbledon.com',
    draws: { singles: 128, doubles: 64 },
  },
  {
    name: 'US Open',
    dates: 'Aug 24 – Sep 6, 2026',
    location: 'USTA Billie Jean King NTC, New York',
    surface: 'Hard',
    prize: '$65M',
    status: 'upcoming',
    url: 'https://www.usopen.org',
    draws: { singles: 128, doubles: 64 },
  },
]

const ATP_MASTERS = [
  { name: 'BNP Paribas Open', location: 'Indian Wells, CA', dates: 'Mar 4–16', surface: 'Hard',  prize: '$9.6M',  status: 'completed', url: 'https://www.bnpparibasopen.com' },
  { name: 'Miami Open',        location: 'Miami, FL',        dates: 'Mar 18–30', surface: 'Hard',  prize: '$9.6M',  status: 'completed', url: 'https://www.miamiopen.com' },
  { name: 'Monte-Carlo Masters', location: 'Monte-Carlo',   dates: 'Apr 6–13',  surface: 'Clay',  prize: '€5.5M',  status: 'completed', url: 'https://www.montecarlomasters.com' },
  { name: 'Mutua Madrid Open', location: 'Madrid, Spain',    dates: 'Apr 21 – May 4', surface: 'Clay', prize: '€9.7M', status: 'completed', url: 'https://www.madrid-open.com' },
  { name: 'Internazionali BNL d\'Italia', location: 'Rome, Italy', dates: 'May 5–18', surface: 'Clay', prize: '€8.8M', status: 'completed', url: 'https://www.internazionalibnlditalia.com' },
  { name: 'Canadian Open',     location: 'Montréal, Canada', dates: 'Jul 22 – Aug 3', surface: 'Hard', prize: '$7.3M', status: 'upcoming', url: 'https://www.rogerscup.com' },
  { name: 'Western & Southern Open', location: 'Cincinnati, OH', dates: 'Aug 10–17', surface: 'Hard', prize: '$7.3M', status: 'upcoming', url: 'https://www.wsopen.com' },
  { name: 'Rolex Paris Masters', location: 'Paris, France',  dates: 'Oct 27 – Nov 2', surface: 'Hard', prize: '€6.0M', status: 'upcoming', url: 'https://www.rolexparismasters.com' },
]

const WTA_EVENTS = [
  { name: 'BNP Paribas Open',  location: 'Indian Wells, CA', dates: 'Mar 4–16',  surface: 'Hard', prize: '$9.6M',  status: 'completed', url: 'https://www.bnpparibasopen.com' },
  { name: 'Miami Open',         location: 'Miami, FL',        dates: 'Mar 19–30', surface: 'Hard', prize: '$9.6M',  status: 'completed', url: 'https://www.miamiopen.com' },
  { name: 'Mutua Madrid Open',  location: 'Madrid, Spain',    dates: 'Apr 21 – May 4', surface: 'Clay', prize: '€9.7M', status: 'completed', url: 'https://www.madrid-open.com' },
  { name: 'Internazionali BNL d\'Italia', location: 'Rome, Italy', dates: 'May 5–18', surface: 'Clay', prize: '€4.2M', status: 'completed', url: 'https://www.internazionalibnlditalia.com' },
  { name: 'Canadian Open',      location: 'Toronto, Canada',  dates: 'Jul 22 – Aug 4', surface: 'Hard', prize: '$7.3M', status: 'upcoming', url: 'https://www.rogerscup.com' },
  { name: 'Western & Southern Open', location: 'Cincinnati, OH', dates: 'Aug 10–17', surface: 'Hard', prize: '$7.3M', status: 'upcoming', url: 'https://www.wsopen.com' },
  { name: 'Guadalajara Open',   location: 'Guadalajara, Mexico', dates: 'Oct 20–26', surface: 'Hard', prize: '$4.5M', status: 'upcoming', url: 'https://www.wtatennis.com' },
]

const YEAR_END = [
  { name: 'Nitto ATP Finals',  location: 'Inalpi Arena, Turin', dates: 'Nov 9–16, 2026',  surface: 'Hard', prize: '$14.75M', status: 'upcoming', url: 'https://www.nittoatpfinals.com', note: 'Top 8 ATP singles + doubles' },
  { name: 'WTA Finals',         location: 'Riyadh, Saudi Arabia', dates: 'Nov 2–9, 2026', surface: 'Hard', prize: '$15.25M', status: 'upcoming', url: 'https://www.wtatennis.com/tournaments/finals', note: 'Top 8 WTA singles + doubles' },
  { name: 'Davis Cup Finals',   location: 'Málaga, Spain',       dates: 'Nov 19–23, 2026', surface: 'Hard', prize: '$12M', status: 'upcoming', url: 'https://www.daviscupfinals.com', note: '16 nations · knockout format' },
  { name: 'Billie Jean King Cup Finals', location: 'TBD',        dates: 'Nov 2026',         surface: 'Hard', prize: '$6M',  status: 'upcoming', url: 'https://www.billiejeankingtenniscup.com', note: '12 nations · round-robin + knockout' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function SurfacePill({ surface }) {
  const s = SURFACE_STYLE[surface] ?? SURFACE_STYLE.Hard
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ background: `color-mix(in srgb, ${s.bg} 15%, transparent)`, color: s.bg, border: `1px solid color-mix(in srgb, ${s.bg} 30%, transparent)` }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.bg }} />
      {s.label}
    </span>
  )
}

function StatusBadge({ status }) {
  if (status === 'live') return (
    <Badge variant="destructive" className="animate-pulse gap-1.5">
      <Zap className="w-3 h-3" /> LIVE NOW
    </Badge>
  )
  if (status === 'completed') return <Badge variant="secondary">Completed</Badge>
  return <Badge variant="outline">Upcoming</Badge>
}

function GrandSlamCard({ slam }) {
  return (
    <motion.div variants={scaleIn}>
      <Card
        variant={slam.status === 'live' ? 'gradient' : 'raised'}
        className={`h-full ${slam.status === 'live' ? 'ring-2 ring-primary' : ''}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 mb-2">
            <StatusBadge status={slam.status} />
            <SurfacePill surface={slam.surface} />
          </div>
          <CardTitle className={`text-xl leading-tight ${slam.status === 'live' ? 'text-primary-foreground' : ''}`}>
            {slam.name}
          </CardTitle>
          <div className="space-y-1.5 mt-1">
            <p className={`text-sm flex items-center gap-1.5 ${slam.status === 'live' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              <Calendar className="w-3.5 h-3.5 shrink-0" />{slam.dates}
            </p>
            <p className={`text-sm flex items-center gap-1.5 ${slam.status === 'live' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              <MapPin className="w-3.5 h-3.5 shrink-0" />{slam.location}
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className={slam.status === 'live' ? 'text-primary-foreground/70' : 'text-muted-foreground'}>Prize Money</span>
            <span className={`font-bold ${slam.status === 'live' ? 'text-primary-foreground' : 'text-foreground'}`}>{slam.prize}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className={slam.status === 'live' ? 'text-primary-foreground/70' : 'text-muted-foreground'}>Draw Size</span>
            <span className={`font-medium ${slam.status === 'live' ? 'text-primary-foreground' : 'text-foreground'}`}>{slam.draws.singles} singles · {slam.draws.doubles} doubles</span>
          </div>
          {slam.status === 'completed' && slam.atpWinner && (
            <div
              className="rounded-xl p-3 space-y-1.5"
              style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">2026 Champions</p>
              <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--primary)' }} />
                {slam.atpWinner} <span className="text-muted-foreground font-normal">· Men's</span>
              </p>
              <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--primary)' }} />
                {slam.wtaWinner} <span className="text-muted-foreground font-normal">· Women's</span>
              </p>
            </div>
          )}
          <a href={slam.url} target="_blank" rel="noopener noreferrer" className="block">
            <Button
              variant={slam.status === 'live' ? 'secondary' : 'outline'}
              size="sm"
              className="w-full gap-2"
            >
              Official Site <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </a>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TourEventRow({ event }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5 rounded-2xl transition-colors hover:bg-muted/50"
      style={{
        background: 'color-mix(in srgb, var(--card) 80%, transparent)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <StatusBadge status={event.status} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{event.name}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 shrink-0" />{event.location}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <SurfacePill surface={event.surface} />
        <div className="text-right hidden sm:block">
          <p className="text-xs text-muted-foreground">{event.dates}</p>
          <p className="text-xs font-semibold text-foreground">{event.prize}</p>
        </div>
        <a href={event.url} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg">
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </a>
      </div>
    </motion.div>
  )
}

function YearEndCard({ event }) {
  return (
    <motion.div variants={fadeInUp}>
      <Card variant="raised" className="h-full">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground leading-snug">{event.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />{event.location}
              </p>
            </div>
            <StatusBadge status={event.status} />
          </div>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{event.dates}</p>
            <p className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5" />{event.prize} total prize</p>
            {event.note && <p className="italic">{event.note}</p>}
          </div>
          <a href={event.url} target="_blank" rel="noopener noreferrer" className="block mt-3">
            <Button variant="outline" size="sm" className="w-full gap-2 h-8 text-xs">
              Official Site <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const liveSlam = GRAND_SLAMS.find(s => s.status === 'live')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

      {/* Page Header */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mb-10">
        <Badge variant="secondary" className="mb-3">2026 Season</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-3">
          Tournament Calendar
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The complete 2026 ATP & WTA schedule — Grand Slams, Masters events, and year-end championships.
        </p>
      </motion.div>

      {/* Live Banner */}
      {liveSlam && (
        <motion.div
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="mb-10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{
            background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, black))',
            boxShadow: '0 8px 32px color-mix(in srgb, var(--primary) 25%, transparent), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-bold text-primary-foreground/80 uppercase tracking-widest">Live Now</span>
            </div>
            <p className="text-xl font-bold text-primary-foreground">{liveSlam.name}</p>
            <p className="text-sm text-primary-foreground/70 mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />{liveSlam.location} · {liveSlam.dates}
            </p>
          </div>
          <a href={liveSlam.url} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="gap-2 shrink-0">
              Follow Live <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      )}

      {/* Grand Slams */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mb-4">
        <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Trophy className="w-6 h-6" style={{ color: 'var(--medal-gold)' }} />
          Grand Slams
        </h2>
        <p className="text-muted-foreground text-sm mt-1">The four majors that define every season</p>
      </motion.div>
      <motion.div
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
      >
        {GRAND_SLAMS.map(s => <GrandSlamCard key={s.name} slam={s} />)}
      </motion.div>

      {/* Tour Events */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mb-6">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Masters & Premier Events</h2>
        <p className="text-muted-foreground text-sm mt-1">ATP Masters 1000 and WTA 1000 — the tier just below the Slams</p>
      </motion.div>

      <Tabs defaultValue="atp" className="mb-14">
        <TabsList className="mb-5">
          <TabsTrigger value="atp">ATP Masters 1000</TabsTrigger>
          <TabsTrigger value="wta">WTA 1000</TabsTrigger>
        </TabsList>

        <TabsContent value="atp">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
            {ATP_MASTERS.map(e => <TourEventRow key={e.name} event={e} />)}
          </motion.div>
        </TabsContent>

        <TabsContent value="wta">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
            {WTA_EVENTS.map(e => <TourEventRow key={e.name} event={e} />)}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Year-End Championships */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mb-6">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Season-Ending Championships</h2>
        <p className="text-muted-foreground text-sm mt-1">Only the best players qualify — the most prestigious invitational events</p>
      </motion.div>
      <motion.div
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
      >
        {YEAR_END.map(e => <YearEndCard key={e.name} event={e} />)}
      </motion.div>

      <motion.p
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
        className="text-xs text-muted-foreground text-center"
      >
        Schedule based on official ATP & WTA 2026 calendars. Dates and prize money subject to change.
        Visit official tournament sites for the most current information.
      </motion.p>
    </div>
  )
}
