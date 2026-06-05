/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 导出 ATP · WTA 排名数据，SPONSORSHIPS 签约数据，门控常量
 * [POS]: data 层静态业务数据，被 components/players/* 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

export const ATP = [
  { rank: 1,  prev: 1,  name: 'Jannik Sinner',    flag: '🇮🇹', pts: 12030, age: 22 },
  { rank: 2,  prev: 2,  name: 'Carlos Alcaraz',   flag: '🇪🇸', pts: 10720, age: 21 },
  { rank: 3,  prev: 3,  name: 'Alexander Zverev', flag: '🇩🇪', pts:  8545, age: 27 },
  { rank: 4,  prev: 5,  name: 'Novak Djokovic',   flag: '🇷🇸', pts:  7650, age: 37 },
  { rank: 5,  prev: 4,  name: 'Daniil Medvedev',  flag: '🇷🇺', pts:  6400, age: 28 },
  { rank: 6,  prev: 7,  name: 'Andrey Rublev',    flag: '🇷🇺', pts:  4875, age: 26 },
  { rank: 7,  prev: 6,  name: 'Casper Ruud',      flag: '🇳🇴', pts:  4220, age: 25 },
  { rank: 8,  prev: 8,  name: 'Hubert Hurkacz',   flag: '🇵🇱', pts:  4015, age: 27 },
  { rank: 9,  prev: 9,  name: 'Taylor Fritz',     flag: '🇺🇸', pts:  3955, age: 26 },
  { rank: 10, prev: 12, name: 'Grigor Dimitrov',  flag: '🇧🇬', pts:  3600, age: 33 },
]

export const WTA = [
  { rank: 1,  prev: 2,  name: 'Aryna Sabalenka',  flag: '🇧🇾', pts: 11260, age: 26 },
  { rank: 2,  prev: 1,  name: 'Iga Świątek',       flag: '🇵🇱', pts: 10785, age: 23 },
  { rank: 3,  prev: 3,  name: 'Coco Gauff',        flag: '🇺🇸', pts:  7400, age: 20 },
  { rank: 4,  prev: 4,  name: 'Jessica Pegula',    flag: '🇺🇸', pts:  5355, age: 30 },
  { rank: 5,  prev: 5,  name: 'Elena Rybakina',    flag: '🇰🇿', pts:  4985, age: 25 },
  { rank: 6,  prev: 8,  name: 'Mirra Andreeva',    flag: '🇷🇺', pts:  4620, age: 17 },
  { rank: 7,  prev: 8,  name: 'Jasmine Paolini',   flag: '🇮🇹', pts:  4380, age: 28 },
  { rank: 8,  prev: 6,  name: 'Emma Navarro',      flag: '🇺🇸', pts:  3820, age: 23 },
  { rank: 9,  prev: 9,  name: 'Barbora Krejčíková',flag: '🇨🇿', pts:  3145, age: 28 },
  { rank: 10, prev: 11, name: 'Daria Kasatkina',   flag: '🇷🇺', pts:  2980, age: 27 },
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
        { brand: 'Lacoste',  category: 'Apparel & Equipment', annualM: 8 },
        { brand: 'Head',     category: 'Racket',              annualM: 5 },
        { brand: 'Hublot',   category: 'Timepiece',           annualM: 7 },
        { brand: 'Peugeot',  category: 'Automotive',          annualM: 5 },
        { brand: 'ANZ',      category: 'Finance',             annualM: 4 },
        { brand: 'QuantumX', category: 'Nutrition',           annualM: 3 },
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
        { brand: 'Nike',       category: 'Apparel & Equipment', annualM: 7 },
        { brand: 'Tecnifibre', category: 'Racket',              annualM: 4 },
        { brand: 'Rolex',      category: 'Timepiece',           annualM: 8 },
        { brand: 'Porsche',    category: 'Automotive',          annualM: 1 },
        { brand: 'ON Running', category: 'Training Footwear',   annualM: 5 },
        { brand: 'Infosys',    category: 'Technology',          annualM: 3 },
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
      name: 'Jasmine Paolini', flag: '🇮🇹', rank: 7, totalM: 14,
      deals: [
        { brand: 'Fila',    category: 'Apparel & Equipment', annualM: 5 },
        { brand: 'Yonex',   category: 'Racket',              annualM: 3 },
        { brand: 'Rolex',   category: 'Timepiece',           annualM: 4 },
        { brand: 'Lavazza', category: 'Food & Beverage',     annualM: 2 },
      ],
    },
  ],
}

export const FREE_RANKINGS_LIMIT = 5
export const FREE_SPONSORS_LIMIT = 2
