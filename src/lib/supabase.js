/**
 * [INPUT]: 依赖 @supabase/supabase-js 的 createClient，依赖 Vite 注入的 import.meta.env
 * [OUTPUT]: 对外提供单例 supabase 客户端（auth / db / storage 统一入口）
 * [POS]: lib 层的后端脐带，全应用唯一的 Supabase 连接点，被 auth.js 与 AuthContext 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { createClient } from '@supabase/supabase-js'

// ─────────────────────────────────────────────────────────────
// 从 .env 读取凭证（VITE_ 前缀才会被注入到前端）
// 缺失即早炸，给出人话错误，而非等到调用时抛晦涩异常
// ─────────────────────────────────────────────────────────────
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error(
    '[supabase] 缺少环境变量，请在项目根目录 .env 填写 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY'
  )
}

// 单例：整个应用共享同一个连接，session 在此唯一沉淀
export const supabase = createClient(url, anonKey)
