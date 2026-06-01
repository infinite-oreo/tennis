/**
 * [INPUT]: 依赖 framer-motion 动效，依赖 @/components/ui/accordion · badge
 * [OUTPUT]: 导出 FAQ 常见问题区（shadcn Accordion，max-w-3xl 居中）
 * [POS]: landing 层消除顾虑，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, viewportConfig } from '@/lib/motion'

const FAQS = [
  {
    q: '支持哪些赛事？',
    a: '覆盖全部 ATP Tour、WTA Tour 赛事，包括四大满贯（澳网、法网、温网、美网）、大师赛，以及 ATP/WTA 250/500 级别挑战赛，共 200+ 年度赛事。',
  },
  {
    q: '数据更新有多快？',
    a: '实时比分采用 WebSocket 推送，延迟 < 0.3 秒，比官方网站快 3-5 倍。球员数据、排名每日凌晨 2 点与 ATP/WTA 官方同步更新。',
  },
  {
    q: '免费版有什么限制？',
    a: '免费版每月可追踪 5 场比赛实时比分，包含基础赛事日历和球员资料。升级 Pro 版后解锁无限追踪、深度数据和精彩集锦回放。',
  },
  {
    q: '如何取消订阅？',
    a: '在账户设置中一键取消，即时生效，当前计费周期结束前仍可享受 Pro 功能。我们不会收取任何取消手续费。',
  },
  {
    q: '支持哪些设备？',
    a: '网页端支持所有主流浏览器；iOS 和 Android App 即将上线（Q3 2025）。数据在所有设备间实时同步。',
  },
  {
    q: '数据准确性如何保证？',
    a: '数据源直接接入 ATP/WTA 官方数据 API，辅以多方数据交叉验证。准确率 > 99.9%，如发现错误可一键反馈，我们会在 10 分钟内核查修正。',
  },
  {
    q: '有教练/俱乐部专属方案吗？',
    a: '有的，团队版支持最多 10 个账号共享，并提供数据 API 接入、定制报告和专属客服。人数更多请联系我们定制企业方案。',
  },
]

export default function FAQ() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">常见问题</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-4">
            还有疑问？
          </h2>
          <p className="text-lg text-muted-foreground">没找到答案？直接联系我们，5 分钟内回复。</p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <Accordion type="single" collapsible className="w-full space-y-2">
            {FAQS.map(({ q, a }, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border rounded-2xl px-5 overflow-hidden"
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                <AccordionTrigger className="text-left font-medium text-foreground py-4 hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
