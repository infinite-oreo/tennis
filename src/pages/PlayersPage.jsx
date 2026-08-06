/**
 * [INPUT]: 依赖 @/components/players/*、@/components/players/wealth/WealthPanel、@/components/players/analysis/SinnerAnalysisPanel，
 *          依赖 @/data/players，依赖 framer-motion，依赖 @/components/ui/*，依赖 @/lib/motion，依赖 @/components/subscription/UpgradeDialog
 * [OUTPUT]: 对外提供 PlayersPage——ATP/WTA 排名 + 签约费用 + Big 3 财富配置 + Sinner 赛场战绩分析（均含门控 + 联盟营销/Pro）
 * [POS]: pages 层，路由 "/players"，被 App.jsx 的 Route 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, DollarSign, Landmark, Activity } from 'lucide-react'
import { fadeInUp, viewportConfig, springs } from '@/lib/motion'
import { ATP, WTA, SPONSORSHIPS } from '@/data/players'
import UpgradeDialog from '@/components/subscription/UpgradeDialog'
import ProBanner from '@/components/players/ProBanner'
import TourSwitcher from '@/components/players/TourSwitcher'
import RankingsPanel from '@/components/players/RankingsPanel'
import SponsorshipsPanel from '@/components/players/SponsorshipsPanel'
import WealthPanel from '@/components/players/wealth/WealthPanel'
import SinnerAnalysisPanel from '@/components/players/analysis/SinnerAnalysisPanel'

// 不依赖 ATP/WTA 巡回赛切换的标签页——单一球员或整合视图，无需展示 TourSwitcher
const TOUR_INDEPENDENT_TABS = new Set(['wealth', 'analysis'])

export default function PlayersPage() {
  const [mainTab, setMainTab] = useState('rankings')
  const [tour, setTour]       = useState('atp')
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mb-10">
        <Badge variant="secondary" className="mb-3">Data Hub</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-3">
          Player Database
        </h1>
        <p className="text-lg text-muted-foreground">
          Live ATP & WTA world rankings and top player endorsement deals, all in one place.
        </p>
      </motion.div>

      <ProBanner onUpgrade={() => setUpgradeOpen(true)} />

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
        <Tabs value={mainTab} onValueChange={setMainTab}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <TabsList className="w-fit">
              <TabsTrigger value="rankings" className="gap-2">
                <Trophy className="w-4 h-4" />Rankings
              </TabsTrigger>
              <TabsTrigger value="sponsorships" className="gap-2">
                <DollarSign className="w-4 h-4" />Endorsements
              </TabsTrigger>
              <TabsTrigger value="wealth" className="gap-2">
                <Landmark className="w-4 h-4" />Wealth
              </TabsTrigger>
              <TabsTrigger value="analysis" className="gap-2">
                <Activity className="w-4 h-4" />Analysis
              </TabsTrigger>
            </TabsList>
            {!TOUR_INDEPENDENT_TABS.has(mainTab) && <TourSwitcher value={tour} onChange={setTour} />}
          </div>

          <Card variant="inset" className="p-2 sm:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={TOUR_INDEPENDENT_TABS.has(mainTab) ? mainTab : `${mainTab}-${tour}`}
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
                <TabsContent value="wealth">
                  <WealthPanel />
                </TabsContent>
                <TabsContent value="analysis">
                  <SinnerAnalysisPanel />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Card>
        </Tabs>
      </motion.div>

      <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
        className="text-xs text-muted-foreground text-center mt-6"
      >
        Rankings sourced from official ATP/WTA points tables (2025 season). Endorsement, wealth, and match-record figures are publicly available estimates for illustrative purposes; actual net worth, contract values, and statistics may differ.
      </motion.p>

      <UpgradeDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} />
    </div>
  )
}
