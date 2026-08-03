/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 导出 BIG3_WEALTH——费德勒/纳达尔/德约科维奇三人财富配置数据（资产分配 + 生涯净值增长曲线）
 * [POS]: data 层静态业务数据，被 components/players/wealth/* 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

// 资产类别固定顺序 + 图标语义，跨三位球员保持一致，方便对比
// 顺序即色阶/位置的绑定顺序——不可按数值大小重排，否则同一类别在不同球员间视觉位置会错位
export const WEALTH_CATEGORIES = [
  { key: 'prize',        label: 'Career Prize Money',          icon: 'Trophy' },
  { key: 'endorsements', label: 'Endorsements & Sponsorships',  icon: 'Handshake' },
  { key: 'ventures',     label: 'Business Ventures & Equity',   icon: 'Rocket' },
  { key: 'realestate',   label: 'Real Estate',                  icon: 'Building2' },
  { key: 'other',        label: 'Cash & Other Investments',     icon: 'PiggyBank' },
]

export const BIG3_WEALTH = [
  {
    id: 'federer', name: 'Roger Federer', flag: '🇨🇭', status: 'Retired · 2022',
    grandSlams: 20, turnedPro: 1998, totalM: 550,
    allocation: {
      prize:        { valueM: 130, note: 'ATP career prize money across 24 seasons on tour' },
      endorsements: { valueM: 150, note: 'Rolex, Mercedes-Benz, Credit Suisse, Barilla — long-running lifetime-value deals' },
      ventures:     { valueM: 190, note: 'On Running pre-IPO equity stake — the single largest driver of his fortune — plus Uniqlo partnership' },
      realestate:   { valueM: 50,  note: 'Lake Geneva estate, Swiss Alps chalet, Dubai holdings' },
      other:        { valueM: 30,  note: 'Liquid assets and a diversified investment portfolio' },
    },
    growth: [
      { year: 2001, netWorthM: 3   },
      { year: 2005, netWorthM: 35  },
      { year: 2009, netWorthM: 90  },
      { year: 2013, netWorthM: 200 },
      { year: 2017, netWorthM: 300 },
      { year: 2020, netWorthM: 350 },
      { year: 2023, netWorthM: 500 },
      { year: 2026, netWorthM: 550 },
    ],
  },
  {
    id: 'nadal', name: 'Rafael Nadal', flag: '🇪🇸', status: 'Retired · 2024',
    grandSlams: 22, turnedPro: 2001, totalM: 220,
    allocation: {
      prize:        { valueM: 135, note: 'ATP career prize money — among the highest all-time earners' },
      endorsements: { valueM: 45,  note: 'Nike, Babolat, Kia, Banco Sabadell, Richard Mille' },
      ventures:     { valueM: 20,  note: 'Rafa Nadal Academy by Movistar, stake in Tuenti' },
      realestate:   { valueM: 15,  note: 'Mallorca estate plus Zel hotel chain co-venture with Meliá' },
      other:        { valueM: 5,   note: 'Cash reserves and passive investments' },
    },
    growth: [
      { year: 2003, netWorthM: 2   },
      { year: 2008, netWorthM: 40  },
      { year: 2012, netWorthM: 90  },
      { year: 2016, netWorthM: 140 },
      { year: 2019, netWorthM: 175 },
      { year: 2022, netWorthM: 200 },
      { year: 2024, netWorthM: 215 },
      { year: 2026, netWorthM: 220 },
    ],
  },
  {
    id: 'djokovic', name: 'Novak Djokovic', flag: '🇷🇸', status: 'Active',
    grandSlams: 24, turnedPro: 2003, totalM: 260,
    allocation: {
      prize:        { valueM: 185, note: 'ATP career prize money — the highest total in tennis history' },
      endorsements: { valueM: 40,  note: 'Lacoste, Hublot, Peugeot, ANZ, Head' },
      ventures:     { valueM: 20,  note: 'QuantumX supplements, Yonder Human Capital, restaurant group in Belgrade' },
      realestate:   { valueM: 10,  note: 'Monte Carlo residence, Belgrade properties' },
      other:        { valueM: 5,   note: 'Cash reserves and diversified holdings' },
    },
    growth: [
      { year: 2005, netWorthM: 1   },
      { year: 2011, netWorthM: 45  },
      { year: 2015, netWorthM: 85  },
      { year: 2018, netWorthM: 130 },
      { year: 2021, netWorthM: 180 },
      { year: 2023, netWorthM: 220 },
      { year: 2025, netWorthM: 250 },
      { year: 2026, netWorthM: 260 },
    ],
  },
]
