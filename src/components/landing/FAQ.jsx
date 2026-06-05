/**
 * [INPUT]: 依赖 framer-motion，依赖 @/components/ui/accordion · badge
 * [OUTPUT]: 对外提供 FAQ 常见问题区（shadcn Accordion，max-w-3xl 居中，7 条问答）
 * [POS]: landing 层异议消除区，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, viewportConfig } from '@/lib/motion'

const FAQS = [
  {
    q: 'Which tournaments are covered?',
    a: 'We cover the full ATP Tour and WTA Tour, including all four Grand Slams (Australian Open, Roland Garros, Wimbledon, US Open), Masters 1000s, and ATP/WTA 250 & 500 events — over 200 tournaments per year.',
  },
  {
    q: 'How fast are score updates?',
    a: 'Live scores are pushed via WebSocket with under 0.3-second latency — 3–5× faster than official tournament websites. Player rankings and stats sync with ATP/WTA official data nightly.',
  },
  {
    q: 'What are the limits on the Free plan?',
    a: 'The Free plan lets you track up to 5 live matches per month, with access to the basic schedule and player profiles. Upgrading to Pro unlocks unlimited tracking, deep analytics, and match highlights.',
  },
  {
    q: 'How do I cancel my subscription?',
    a: "Cancel anytime from your account settings — no cancellation fees, ever. You'll keep full Pro access until the end of your current billing period.",
  },
  {
    q: 'What devices are supported?',
    a: 'The web app works on all modern browsers. Native iOS and Android apps are coming in Q3 2025. Your data stays in sync across every device.',
  },
  {
    q: 'How accurate is the data?',
    a: 'Data is sourced directly from the official ATP/WTA data feeds and cross-validated against multiple providers, with accuracy above 99.9%. Spot an error? Flag it in-app and we\'ll investigate within 10 minutes.',
  },
  {
    q: 'Do you offer plans for coaches or clubs?',
    a: 'Yes — the Team plan supports up to 10 seats with shared access, a data API, custom reports, and dedicated support. Need more seats? Contact us for an enterprise quote.',
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
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-muted-foreground">Can't find what you're looking for? We reply within 5 minutes.</p>
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
