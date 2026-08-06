/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 导出 SINNER_PROFILE（基础信息 + 生涯胜负）、SURFACE_RECORD（场地战绩）、
 *           GRAND_SLAM_RECORD（大满贯战绩）、RANKING_TREND（排名走势）
 * [POS]: data 层静态业务数据，被 components/players/analysis/* 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

export const SINNER_PROFILE = {
  name: 'Jannik Sinner', flag: '🇮🇹', rank: 1, age: 24, turnedPro: 2018,
  careerWins: 268, careerLosses: 68, titles: 21,
}

// 场地固定顺序：Hard → Clay → Grass，与 ATP 赛季日历顺序一致
export const SURFACE_RECORD = [
  { key: 'hard',  label: 'Hard Court',  wins: 190, losses: 42 },
  { key: 'clay',  label: 'Clay Court',  wins: 48,  losses: 19 },
  { key: 'grass', label: 'Grass Court', wins: 30,  losses: 7  },
]

// 四大满贯固定顺序：赛季先后（AO → RG → Wimbledon → US Open）
export const GRAND_SLAM_RECORD = [
  { key: 'ao',  label: 'Australian Open', result: 'champion', resultLabel: 'Champion',  years: [2024, 2025] },
  { key: 'rg',  label: 'Roland Garros',   result: 'runnerup', resultLabel: 'Runner-up', years: [2025] },
  { key: 'wim', label: 'Wimbledon',       result: 'champion', resultLabel: 'Champion',  years: [2025] },
  { key: 'uso', label: 'US Open',         result: 'champion', resultLabel: 'Champion',  years: [2024] },
]

// 年终排名走势——数值越小名次越好，图表按此语义反转 y 轴
export const RANKING_TREND = [
  { year: 2019, rank: 553 },
  { year: 2020, rank: 37  },
  { year: 2021, rank: 10  },
  { year: 2022, rank: 15  },
  { year: 2023, rank: 4   },
  { year: 2024, rank: 1   },
  { year: 2025, rank: 1   },
  { year: 2026, rank: 1   },
]
