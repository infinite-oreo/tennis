/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 导出 ATP · WTA 排名数据，SPONSORSHIPS 签约数据，门控常量
 * [POS]: data 层静态业务数据，被 components/players/* 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

export const ATP = [
  { rank: 1,  prev: 1,  name: 'Jannik Sinner',            flag: '🇮🇹', pts: 13450, age: 24 },
  { rank: 2,  prev: 2,  name: 'Alexander Zverev',         flag: '🇩🇪', pts:  8480, age: 29 },
  { rank: 3,  prev: 3,  name: 'Carlos Alcaraz',           flag: '🇪🇸', pts:  8160, age: 23 },
  { rank: 4,  prev: 4,  name: 'Felix Auger-Aliassime',    flag: '🇨🇦', pts:  4740, age: 25 },
  { rank: 5,  prev: 5,  name: 'Alex de Minaur',           flag: '🇦🇺', pts:  4110, age: 27 },
  { rank: 6,  prev: 6,  name: 'Ben Shelton',              flag: '🇺🇸', pts:  3770, age: 23 },
  { rank: 7,  prev: 7,  name: 'Novak Djokovic',           flag: '🇷🇸', pts:  3760, age: 39 },
  { rank: 8,  prev: 8,  name: 'Daniil Medvedev',          flag: '🇷🇺', pts:  3670, age: 30 },
  { rank: 9,  prev: 9,  name: 'Flavio Cobolli',           flag: '🇮🇹', pts:  3460, age: 23 },
  { rank: 10, prev: 10, name: 'Taylor Fritz',             flag: '🇺🇸', pts:  3365, age: 28 },
]

export const WTA = [
  { rank: 1,  prev: 1,  name: 'Aryna Sabalenka',   flag: '🇧🇾', pts: 8550, age: 28 },
  { rank: 2,  prev: 2,  name: 'Elena Rybakina',    flag: '🇰🇿', pts: 8143, age: 27 },
  { rank: 3,  prev: 3,  name: 'Jessica Pegula',    flag: '🇺🇸', pts: 6301, age: 32 },
  { rank: 4,  prev: 4,  name: 'Coco Gauff',        flag: '🇺🇸', pts: 5649, age: 22 },
  { rank: 5,  prev: 5,  name: 'Mirra Andreeva',    flag: '🇷🇺', pts: 5293, age: 19 },
  { rank: 6,  prev: 6,  name: 'Karolína Muchová',  flag: '🇨🇿', pts: 5168, age: 29 },
  { rank: 7,  prev: 7,  name: 'Linda Nosková',     flag: '🇨🇿', pts: 5119, age: 21 },
  { rank: 8,  prev: 8,  name: 'Iga Świątek',       flag: '🇵🇱', pts: 4539, age: 25 },
  { rank: 9,  prev: 9,  name: 'Amanda Anisimova',  flag: '🇺🇸', pts: 4353, age: 24 },
  { rank: 10, prev: 10, name: 'Elina Svitolina',   flag: '🇺🇦', pts: 4351, age: 31 },
]

export const SPONSORSHIPS = {
  atp: [
    {
      name: 'Jannik Sinner', flag: '🇮🇹', rank: 1, totalM: 35,
      deals: [
        { brand: 'Nike',    category: 'Apparel & Equipment', annualM: 10 },
        { brand: 'Head',    category: 'Racket',              annualM: 4  },
        { brand: 'Rolex',   category: 'Timepiece',           annualM: 8  },
        { brand: 'Gucci',   category: 'Brand Ambassador',    annualM: 10 },
        { brand: 'Fastweb', category: 'Telecom',             annualM: 3  },
      ],
    },
    {
      name: 'Alexander Zverev', flag: '🇩🇪', rank: 2, totalM: 26,
      deals: [
        { brand: 'Adidas',  category: 'Apparel & Equipment', annualM: 8 },
        { brand: 'Head',    category: 'Racket',              annualM: 4 },
        { brand: 'Rolex',   category: 'Timepiece',           annualM: 8 },
        { brand: 'Porsche', category: 'Automotive',          annualM: 6 },
      ],
    },
    {
      name: 'Carlos Alcaraz', flag: '🇪🇸', rank: 3, totalM: 48,
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
      name: 'Novak Djokovic', flag: '🇷🇸', rank: 7, totalM: 32,
      deals: [
        { brand: 'Lacoste',  category: 'Apparel & Equipment', annualM: 8 },
        { brand: 'Head',     category: 'Racket',              annualM: 5 },
        { brand: 'Hublot',   category: 'Timepiece',           annualM: 7 },
        { brand: 'Peugeot',  category: 'Automotive',          annualM: 5 },
        { brand: 'ANZ',      category: 'Finance',             annualM: 4 },
        { brand: 'QuantumX', category: 'Nutrition',           annualM: 3 },
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
      name: 'Elena Rybakina', flag: '🇰🇿', rank: 2, totalM: 20,
      deals: [
        { brand: 'Yonex',   category: 'Apparel & Equipment', annualM: 8 },
        { brand: 'Red Bull',category: 'Beverage',            annualM: 4 },
        { brand: 'Porsche', category: 'Automotive',          annualM: 5 },
        { brand: 'Bank RBK',category: 'Finance',             annualM: 3 },
      ],
    },
    {
      name: 'Coco Gauff', flag: '🇺🇸', rank: 4, totalM: 29,
      deals: [
        { brand: 'New Balance', category: 'Apparel & Equipment', annualM: 10 },
        { brand: 'Head',        category: 'Racket',              annualM: 4  },
        { brand: 'Rolex',       category: 'Timepiece',           annualM: 8  },
        { brand: 'Bose',        category: 'Electronics',         annualM: 4  },
        { brand: 'Barilla',     category: 'Food & Beverage',     annualM: 3  },
      ],
    },
    {
      name: 'Iga Świątek', flag: '🇵🇱', rank: 8, totalM: 28,
      deals: [
        { brand: 'Nike',       category: 'Apparel & Equipment', annualM: 7 },
        { brand: 'Tecnifibre', category: 'Racket',              annualM: 4 },
        { brand: 'Rolex',      category: 'Timepiece',           annualM: 8 },
        { brand: 'Porsche',    category: 'Automotive',          annualM: 1 },
        { brand: 'ON Running', category: 'Training Footwear',   annualM: 5 },
        { brand: 'Infosys',    category: 'Technology',          annualM: 3 },
      ],
    },
  ],
}

export const FREE_RANKINGS_LIMIT = 5
export const FREE_SPONSORS_LIMIT = 2
