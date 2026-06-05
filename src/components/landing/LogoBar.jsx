/**
 * [INPUT]: 无外部数据依赖，依赖 framer-motion 动效
 * [OUTPUT]: 导出 LogoBar 信任背书条，展示合作赛事/媒体名称，附官方跳转链接
 * [POS]: landing 层 Hero 下方信任带，被 LandingPage.jsx 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { motion } from 'framer-motion'
import { fadeInUp, viewportConfig } from '@/lib/motion'
import { ExternalLink } from 'lucide-react'

const LOGOS = [
  { name: 'ATP Tour',         url: 'https://www.atptour.com' },
  { name: 'WTA',              url: 'https://www.wtatennis.com' },
  { name: 'ITF',              url: 'https://www.itftennis.com' },
  { name: 'Wimbledon',        url: 'https://www.wimbledon.com' },
  { name: 'Roland Garros',    url: 'https://www.rolandgarros.com' },
  { name: 'US Open',          url: 'https://www.usopen.org' },
  { name: 'Australian Open',  url: 'https://www.ausopen.com' },
]

export default function LogoBar() {
  return (
    <section className="border-y border-border bg-muted/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest"
        >
          Trusted by fans of the world's biggest tournaments
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {LOGOS.map(({ name, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 text-base md:text-lg font-bold text-muted-foreground/50 hover:text-foreground transition-colors duration-300 tracking-tight"
              title={`Visit ${name} official site`}
            >
              {name}
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200 shrink-0" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
