/**
 * [INPUT]: 依赖 react 的 createContext/useContext/useEffect/useState，依赖 @/lib/supabase 的 supabase.auth
 * [OUTPUT]: 对外提供 AuthProvider 组件、useAuth() hook（{ user, loading }）
 * [POS]: contexts 层的认证状态单一真相源，包裹全应用；user 状态在此唯一沉淀，组件只读不猜
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const AuthContext = createContext({ user: null, loading: true })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 当下：开局问一次"现在谁在线"
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    // 未来：订阅广播，登入/登出/刷新自动流回
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// 全应用读取登录状态的唯一入口
export const useAuth = () => useContext(AuthContext)
