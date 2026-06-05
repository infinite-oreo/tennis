/**
 * [INPUT]: 依赖 @/lib/supabase 的 supabase.auth，依赖 @/contexts/AuthContext 的 useAuth
 * [OUTPUT]: 对外提供 SubscriptionProvider 组件、useSubscription() hook（{ plan, isPro, loading, upgrade, downgrade }）
 * [POS]: contexts 层的订阅状态真相源，嵌套在 AuthProvider 内；plan 存于 Supabase user_metadata，跟随 auth 状态自动同步
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthContext'

// ─── 计划层级：越高越贵 ───────────────────────────────────────────
const PLAN_RANK = { free: 0, pro: 1, team: 2 }

const SubscriptionContext = createContext({
  plan: 'free',
  isPro: false,
  loading: false,
  upgrade: async () => ({ error: null }),
  downgrade: async () => {},
})

export function SubscriptionProvider({ children }) {
  const { user } = useAuth()
  const [plan, setPlan] = useState('free')
  const [loading, setLoading] = useState(false)

  // 跟随 user 状态同步 plan：登录读 metadata，登出归 free
  useEffect(() => {
    if (!user) { setPlan('free'); return }
    setPlan(user.user_metadata?.plan ?? 'free')
  }, [user])

  // 升级：写入 Supabase user_metadata，乐观更新本地状态
  // 生产环境：在此处调用 Stripe Checkout，payment 成功后 webhook 再写 metadata
  async function upgrade(newPlan) {
    if (!user) return { error: 'not_logged_in' }
    if ((PLAN_RANK[newPlan] ?? 0) <= PLAN_RANK[plan]) return { error: 'already_at_or_above' }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ data: { plan: newPlan } })
    if (!error) setPlan(newPlan)
    setLoading(false)
    return { error }
  }

  async function downgrade() {
    if (!user) return
    setLoading(true)
    await supabase.auth.updateUser({ data: { plan: 'free' } })
    setPlan('free')
    setLoading(false)
  }

  return (
    <SubscriptionContext.Provider value={{ plan, isPro: PLAN_RANK[plan] >= PLAN_RANK.pro, loading, upgrade, downgrade }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscription = () => useContext(SubscriptionContext)
