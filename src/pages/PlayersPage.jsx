/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/tabs · card · badge · button，依赖 lucide-react，依赖 @/lib/motion · utils，依赖 @/contexts/SubscriptionContext，依赖 @/components/subscription/PremiumGate · UpgradeDialog，依赖 @/data/affiliates
 * [OUTPUT]: 对外提供 PlayersPage——ATP/WTA 世界排名 + 球员签约费用数据（含 Pro 门控 + 联盟营销链接）
 * [POS]: pages 层，路由 "/players"，被 App.jsx 的 Route 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, Minus, Trophy, DollarSign, ShoppingBag, Crown } from 'lucide-react'
import { fadeInUp, staggerContainer, scaleIn, viewportConfig, springs } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { useSubscription } from '@/contexts/SubscriptionContext'
import PremiumGate from '@/components/subscription/PremiumGate'
import UpgradeDialog from '@/components/subscription/UpgradeDialog'
import { AFFILIATE_LINKS, SHOPPABLE_CATEGORIES } from '@/data/affiliates'

/* ── Data ───────────────────────────────────────────────────────── */

const ATP = [
  { rank: 1,  prev: 1,  name: 'Jannik Sinner',     flag: '🇮🇹', pts: 12030, age: 22 },
  { rank: 2,  prev: 2,  name: 'Carlos Alcaraz',    flag: '🇪🇸', pts: 10720, age: 21 },
  { rank: 3,  prev: 3,  name: 'Alexander Zverev',  flag: '🇩🇪', pts:  8545, age: 27 },
  { rank: 4,  prev: 5,  name: 'Novak Djokovic',    flag: '🇷🇸', pts:  7650, age: 37 },
  { rank: 5,  prev: 4,  name: 'Daniil Medvedev',   flag: '🇷🇺', pts:  6400, age: 28 },
  { rank: 6,  prev: 7,  name: 'Andrey Rublev',     flag: '🇷🇺', pts:  4875, age: 26 },
  { rank: 7,  prev: 6,  name: 'Casper Ruud',       flag: '🇳🇴', pts:  4220, age: 25 },
  { rank: 8,  prev: 8,  name: 'Hubert Hurkacz',    flag: '🇵🇱', pts:  4015, age: 27 },
  { rank: 9,  prev: 9,  name: 'Taylor Fritz',      flag: '🇺🇸', pts:  3955, age: 26 },
  { rank: 10, prev: 12, name: 'Grigor Dimitrov',   flag: '🇧🇬', pts:  3600, age: 33 },
]

const WTA = [
  { rank: 1,  prev: 2,  name: 'Aryna Sabalenka',   flag: '🇧🇾', pts: 11260, age: 26 },
  { rank: 2,  prev: 1,  name: 'Iga Świątek',        flag: '🇵🇱', pts: 10785, age: 23 },
  { rank: 3,  prev: 3,  name: 'Coco Gauff',         flag: '🇺🇸', pts:  7400, age: 20 },
  { rank: 4,  prev: 4,  name: 'Jessica Pegula',     flag: '🇺🇸', pts:  5355, age: 30 },
  { rank: 5,  prev: 5,  name: 'Elena Rybakina',     flag: '🇰🇿', pts:  4985, age: 25 },
  { rank: 6,  prev: 8,  name: 'Mirra Andreeva',     flag: '🇷🇺', pts:  4620, age: 17 },
  { rank: 7,  prev: 7,  name: 'Qinwen Zheng',       flag: '🇨🇳', pts:  4445, age: 22 },
  { rank: 8,  prev: 6,  name: 'Jasmine Paolini',    flag: '🇮🇹', pts:  4380, age: 28 },
  { rank: 9,  prev: 10, name: 'Emma Navarro',       flag: '🇺🇸', pts:  3820, age: 23 },
  { rank: 10, prev: 9,  name: 'Barbora Krejčíková', flag: '🇨🇿', pts:  3145, age: 28 },
]

const SPONSORSHIPS = {
  atp: [
    {
      name: 'Jannik Sinner', flag: '🇮🇹', rank: 1, totalM: 35,
      deals: [
        { brand: 'Nike',     category: 'Apparel & Equipment', annualM: 10 },
        { brand: 'Head',     category: 'Racket',              annualM: 4  },
        { brand: 'Rolex',    category: 'Timepiece',           annualM: 8  },
        { brand: 'Gucci',    category: 'Brand Ambassador',    annualM: 10 },
        { brand: 'Fastweb',  category: 'Telecom',             annualM: 3  },
      ],
    },
    {
      name: 'Carlos Alcaraz', flag: '🇪🇸', rank: 2, totalM: 48,
      deals: [
        { brand: 'Nike',          category: 'Apparel & Equipment', annualM: 15 },
        { brand: 'Babolat',       category: 'Racket',              annualM: 3  },
        { brand: 'Ralph Lauren',  category: 'Brand Ambassador',    annualM: 15 },
        { brand: 'Rolex',         category: 'Timepiece',           annualM: 8  },
        { brand: 'Tudor',         category: 'Timepiece Collab',    annualM: 3  },
        { brand: 'Estrella Damm', category: 'Beverage',            annualM: 4  },
      ],
    },
    {
      name: 'Novak Djokovic', flag: '🇷🇸', rank: 4, totalM: 32,
      deals: [
        { brand: 'Lacoste',   category: 'Apparel & Equipment', annualM: 8 },
        { brand: 'Head',      category: 'Racket',              annualM: 5 },
        { brand: 'Hublot',    category: 'Timepiece',           annualM: 7 },
        { brand: 'Peugeot',   category: 'Automotive',          annualM: 5 },
        { brand: 'ANZ',       category: 'Finance',             annualM: 4 },
        { brand: 'QuantumX',  category: 'Nutrition',           annualM: 3 },
      ],
    },
    {
      name: 'Alexander Zverev', flag: '🇩🇪', rank: 3, totalM: 26,
      deals: [
        { brand: 'Adidas',  category: 'Apparel & Equipment', annualM: 8 },
        { brand: 'Head',    category: 'Racket',              annualM: 4 },
        { brand: 'Rolex',   category: 'Timepiece',           annualM: 8 },
        { brand: 'Porsche', category: 'Automotive',          annualM: 6 },
      ],
    },
  ],
  wta: [
    {
      name: 'Aryna Sabalenka', flag: '🇧🇾', rank: 1, totalM: 22,
      deals: [
        { brand: 'Nike',    category: 'Apparel & Equipment', annualM: 5 },
        { brand: 'Head',    category: 'Racket',              annualM: 3 },
        { brand: 'Porsche', category: 'Automotive',          annualM: 6 },
        { brand: 'Hublot',  category: 'Timepiece',           annualM: 5 },
        { brand: 'Tiger',   category: 'Nutrition',           annualM: 3 },
      ],
    },
    {
      name: 'Iga Świątek', flag: '🇵🇱', rank: 2, totalM: 28,
      deals: [
        { brand: 'Nike',        category: 'Apparel & Equipment', annualM: 7 },
        { brand: 'Tecnifibre',  category: 'Racket',              annualM: 4 },
        { brand: 'Rolex',       category: 'Timepiece',           annualM: 8 },
        { brand: 'Porsche',     category: 'Automotive',          annualM: 1 },
        { brand: 'ON Running',  category: 'Training Footwear',   annualM: 5 },
        { brand: 'Infosys',     category: 'Technology',          annualM: 3 },
      ],
    },
    {
      name: 'Coco Gauff', flag: '🇺🇸', rank: 3, totalM: 29,
      deals: [
        { brand: 'New Balance', category: 'Apparel & Equipment', annualM: 10 },
        { brand: 'Head',        category: 'Racket',              annualM: 4  },
        { brand: 'Rolex',       category: 'Timepiece',           annualM: 8  },
        { brand: 'Bose',        category: 'Electronics',         annualM: 4  },
        { brand: 'Barilla',     category: 'Food & Beverage',     annualM: 3  },
      ],
    },
    {
      name: 'Qinwen Zheng', flag: '🇨🇳', rank: 7, totalM: 18,
      deals: [
        { brand: 'Fila',          category: 'Apparel & Equipment', annualM: 6 },
        { brand: 'Wilson',        category: 'Racket',              annualM: 3 },
        { brand: 'Longines',      category: 'Timepiece',           annualM: 5 },
        { brand: 'Bank of China', category: 'Finance',             annualM: 4 },
      ],
    },
  ],
}

// 免费层展示数量限制
const FREE_RANKINGS_LIMIT = 5
const FREE_SPONSORS_LIMIT = 2

/* ── Sub-components ─────────────────────────────────────────────── */

function TrendIcon({ rank, prev }) {
  const delta = prev - rank
  if (delta > 0) return <TrendingUp className="w-4 h-4" style={{ color: 'var(--primary)' }} />
  if (delta < 0) return <TrendingDown className="w-4 h-4 text-destructive" />
  return <Minus className="w-4 h-4 text-muted-foreground" />
}

function TrendBadge({ rank, prev }) {
  const delta = prev - rank
  if (delta === 0) return <span className="text-xs text-muted-foreground">—</span>
  const color = delta > 0 ? 'var(--primary)' : 'var(--destructive)'
  return <span className="text-xs font-medium" style={{ color }}>{delta > 0 ? '+' : ''}{delta}</span>
}

// 奖牌渐变色从设计系统 token 生成——token 定义在 index.css :root
const MEDAL_GRADIENT = [
  'linear-gradient(135deg, var(--medal-gold), color-mix(in srgb, var(--medal-gold) 65%, black))',
  'linear-gradient(135deg, var(--medal-silver), color-mix(in srgb, var(--medal-silver) 65%, black))',
  'linear-gradient(135deg, var(--medal-bronze), color-mix(in srgb, var(--medal-bronze) 65%, black))',
]

function RankRow({ player }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors hover:bg-muted/60"
    >
      <div className="w-8 flex-shrink-0 flex items-center justify-center">
        {player.rank <= 3 ? (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground"
            style={{
              background: MEDAL_GRADIENT[player.rank - 1],
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            {player.rank}
          </div>
        ) : (
          <span className="text-sm font-semibold text-muted-foreground">{player.rank}</span>
        )}
      </div>

      <div className="w-5 flex-shrink-0 flex items-center">
        <TrendIcon rank={player.rank} prev={player.prev} />
      </div>

      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="text-xl leading-none">{player.flag}</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{player.name}</p>
          <p className="text-xs text-muted-foreground">Age {player.age}</p>
        </div>
      </div>

      <div className="w-8 text-right flex-shrink-0">
        <TrendBadge rank={player.rank} prev={player.prev} />
      </div>

      <div className="w-20 text-right flex-shrink-0">
        <span className="text-sm font-bold text-foreground">{player.pts.toLocaleString()}</span>
        <p className="text-xs text-muted-foreground">pts</p>
      </div>
    </motion.div>
  )
}

// 联盟营销：带购买链接的品牌行
function DealRow({ deal }) {
  const affiliateUrl = AFFILIATE_LINKS[deal.brand]
  const isShoppable = SHOPPABLE_CATEGORIES.has(deal.category) && affiliateUrl

  return (
    <div
      className="flex items-center justify-between rounded-xl px-3 py-2"
      style={{
        background: 'color-mix(in srgb, var(--muted) 60%, transparent)',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--primary)' }} />
        <span className="text-sm font-medium text-foreground">{deal.brand}</span>
        <span className="text-xs text-muted-foreground hidden sm:inline">· {deal.category}</span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs font-semibold text-foreground">
          ~${deal.annualM}<span className="font-normal text-muted-foreground">M/yr</span>
        </span>
        {isShoppable && (
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            title={`Shop ${deal.brand} tennis gear (affiliate link)`}
            onClick={e => e.stopPropagation()}
          >
            <Button variant="outline" size="sm" className="h-6 px-2 text-[10px] gap-1 rounded-lg">
              <ShoppingBag className="w-3 h-3" />
              Shop
            </Button>
          </a>
        )}
      </div>
    </div>
  )
}

function SponsorCard({ player }) {
  return (
    <motion.div variants={scaleIn}>
      <Card variant="raised" className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{player.flag}</span>
                <Badge variant="outline" className="text-xs">#{player.rank}</Badge>
              </div>
              <CardTitle className="text-base leading-tight">{player.name}</CardTitle>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-muted-foreground mb-0.5">Est. Annual</p>
              <p className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                ~${player.totalM}<span className="text-xs font-normal text-muted-foreground">M</span>
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {player.deals.map(deal => <DealRow key={deal.brand} deal={deal} />)}
          </div>
          {/* 联盟披露声明（合规要求） */}
          <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
            * Shop links may be affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function RankingsPanel({ players }) {
  const { isPro } = useSubscription()
  const visible = players.slice(0, FREE_RANKINGS_LIMIT)
  const locked  = players.slice(FREE_RANKINGS_LIMIT)

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-1">
      {/* 表头 */}
      <div className="flex items-center gap-3 px-4 py-2 text-xs text-muted-foreground">
        <div className="w-8 text-center">Rank</div>
        <div className="w-5" />
        <div className="flex-1">Player</div>
        <div className="w-8 text-right">Chg</div>
        <div className="w-20 text-right">Points</div>
      </div>

      {visible.map(p => <RankRow key={p.name} player={p} />)}

      {/* 免费层：仅展示前5，其余门控 */}
      {isPro
        ? locked.map(p => <RankRow key={p.name} player={p} />)
        : (
          <PremiumGate label="See the full Top 10 rankings with Pro">
            <div className="space-y-1">
              {locked.map(p => <RankRow key={p.name} player={p} />)}
            </div>
          </PremiumGate>
        )
      }
    </motion.div>
  )
}

function SponsorshipsPanel({ players }) {
  const { isPro } = useSubscription()
  const visible = players.slice(0, FREE_SPONSORS_LIMIT)
  const locked  = players.slice(FREE_SPONSORS_LIMIT)

  return (
    <div className="space-y-5">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-5"
      >
        {visible.map(p => <SponsorCard key={p.name} player={p} />)}
      </motion.div>

      {locked.length > 0 && (
        isPro
          ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-5"
            >
              {locked.map(p => <SponsorCard key={p.name} player={p} />)}
            </motion.div>
          )
          : (
            <PremiumGate label="Unlock all player endorsement deals with Pro">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {locked.map(p => <SponsorCard key={p.name} player={p} />)}
              </div>
            </PremiumGate>
          )
      )}
    </div>
  )
}

// Tour 切换器（独立按钮组，防止 Radix Tabs onValueChange 干扰）
function TourSwitcher({ value, onChange }) {
  return (
    <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
      {[{ id: 'atp', label: "ATP Men's" }, { id: 'wta', label: "WTA Women's" }].map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-semibold transition-all',
            value === id ? 'bg-background text-foreground shadow-sm' : 'hover:text-foreground'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

/* ── Pro 徽章 / 会员状态条 ──────────────────────────────────────── */
function ProBanner({ onUpgrade }) {
  const { isPro, plan } = useSubscription()
  if (isPro) {
    return (
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-2xl mb-6 w-fit"
        style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}
      >
        <Crown className="w-4 h-4" style={{ color: 'var(--primary)' }} />
        <span className="text-sm font-semibold capitalize" style={{ color: 'var(--primary)' }}>
          {plan} — Full access unlocked
        </span>
      </div>
    )
  }
  return (
    <div
      className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl mb-6 border"
      style={{ borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)', background: 'color-mix(in srgb, var(--primary) 6%, transparent)' }}
    >
      <div className="flex items-center gap-2">
        <Crown className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Free plan · Rankings 1–5 · 2 endorsement profiles
        </span>
      </div>
      <Button size="sm" variant="outline" onClick={onUpgrade} className="shrink-0">
        Upgrade to Pro
      </Button>
    </div>
  )
}

/* ── Main Page ──────────────────────────────────────────────────── */

export default function PlayersPage() {
  const [mainTab, setMainTab] = useState('rankings')
  const [tour, setTour]       = useState('atp')
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-10"
      >
        <Badge variant="secondary" className="mb-3">Data Hub</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-3">
          Player Database
        </h1>
        <p className="text-lg text-muted-foreground">
          Live ATP & WTA world rankings and top player endorsement deals, all in one place.
        </p>
      </motion.div>

      <ProBanner onUpgrade={() => setUpgradeOpen(true)} />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <Tabs value={mainTab} onValueChange={setMainTab}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <TabsList className="w-fit">
              <TabsTrigger value="rankings" className="gap-2">
                <Trophy className="w-4 h-4" />
                Rankings
              </TabsTrigger>
              <TabsTrigger value="sponsorships" className="gap-2">
                <DollarSign className="w-4 h-4" />
                Endorsements
              </TabsTrigger>
            </TabsList>

            <TourSwitcher value={tour} onChange={setTour} />
          </div>

          <Card variant="inset" className="p-2 sm:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${mainTab}-${tour}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: springs.gentle }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              >
                <TabsContent value="rankings">
                  <RankingsPanel players={tour === 'atp' ? ATP : WTA} />
                </TabsContent>
                <TabsContent value="sponsorships">
                  <SponsorshipsPanel players={SPONSORSHIPS[tour]} />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Card>
        </Tabs>
      </motion.div>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="text-xs text-muted-foreground text-center mt-6"
      >
        Rankings sourced from official ATP/WTA points tables (2025 season). Endorsement figures are publicly available estimates; actual contract values may differ.
      </motion.p>

      <UpgradeDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} />
    </div>
  )
}
