/**
 * [INPUT]: 依赖 ./supabase 的 supabase 客户端的 auth 能力
 * [OUTPUT]: 对外提供 signInWithGoogle、signOut 两个登录动作
 * [POS]: lib 层的认证动作集，纯副作用函数；状态（user）由 contexts/AuthContext 独占，此处只管"做"
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { supabase } from './supabase'

// ─────────────────────────────────────────────────────────────
// Google 登录：跳转 Google 授权页，回调后由 onAuthStateChange 接管
// redirectTo 必须落在 Supabase 后台 Redirect URLs 白名单内
// ─────────────────────────────────────────────────────────────
export const signInWithGoogle = () =>
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  })

// 登出：清除本地 session，触发全局状态归零
export const signOut = () => supabase.auth.signOut()
