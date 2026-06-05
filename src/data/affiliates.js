/**
 * [INPUT]: 无外部依赖，纯数据常量
 * [OUTPUT]: 对外提供 AFFILIATE_LINKS（品牌→链接映射）、SHOPPABLE_CATEGORIES（需展示购买按钮的品类集合）
 * [POS]: data 层联盟营销数据源，被 PlayersPage 的 DealRow 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 *
 * ⚠️ 上线前请将每个链接替换为你自己的联盟专属 URL（含你的 ref/affiliate_id 参数）
 *    申请渠道：
 *    - Nike:        affiliates.nike.com
 *    - Wilson:      impact.com → Wilson Sporting Goods
 *    - Babolat:     avantlink.com 或 babolat.com/partners
 *    - Head:        head.com/en/company/affiliate-program
 *    - Adidas:      adidas.com/us/affiliate-program
 *    - New Balance: newbalance.com → Affiliate Program
 *    - Tecnifibre:  直接联系 marketing@tecnifibre.com
 *    - Lacoste:     rakutenadvertising.com
 *    - Fila:        cj.com → FILA
 *    - On Running:  on.com/en-us/affiliate
 *    - Yonex:       yonex.com → Partners
 */

// ─── 品牌联盟链接（已验证可达的官方落地页）───────────────────────────────────
export const AFFILIATE_LINKS = {
  'Nike':        'https://www.nike.com/w/tennis',
  'Wilson':      'https://www.wilson.com/en-us/sport/tennis',
  'Babolat':     'https://www.babolat.com/en/sport/tennis',
  'Head':        'https://www.head.com/en/sports/tennis',
  'Adidas':      'https://www.adidas.com/us/tennis',
  'New Balance': 'https://www.newbalance.com/c/tennis/',
  'Tecnifibre':  'https://www.tecnifibre.com/en',
  'Lacoste':     'https://www.lacoste.com/us/tennis/',
  'Fila':        'https://www.fila.com/en-us/',
  'ON Running':  'https://www.on.com/en-us/',
  'Yonex':       'https://www.yonex.com/tennis',
}

// 这些品类的品牌展示「立即购买」按钮
export const SHOPPABLE_CATEGORIES = new Set([
  'Apparel & Equipment',
  'Racket',
  'Training Footwear',
])
