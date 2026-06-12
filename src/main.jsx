/**
 * [INPUT]: 依赖 ./App.jsx 的根组件，依赖 ./index.css 的全局样式，依赖 framer-motion 的 MotionConfig，依赖 @/contexts/AuthContext 的 AuthProvider，依赖 @/contexts/SubscriptionContext 的 SubscriptionProvider
 * [OUTPUT]: 无导出，挂载 React 应用到 #root DOM 节点
 * [POS]: 应用入口，唯一挂载点，被 index.html 的 <script type="module"> 调用；全局植入 reducedMotion 可访问性、Auth 状态与 Subscription 状态
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { AuthProvider } from '@/contexts/AuthContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'
import './index.css'
import App from './App.jsx'

// render 崩溃兜底：白屏变可读错误，便于排查
class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'monospace', color: '#c00' }}>
          <strong>App crashed:</strong>
          <pre style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      {/* reducedMotion="user" —— 跟随系统 prefers-reduced-motion，关怀前庭敏感用户 */}
      <MotionConfig reducedMotion="user">
        {/* AuthProvider → SubscriptionProvider：订阅状态依赖 Auth，必须嵌套在内 */}
        <AuthProvider>
          <SubscriptionProvider>
            <App />
          </SubscriptionProvider>
        </AuthProvider>
      </MotionConfig>
    </ErrorBoundary>
  </StrictMode>,
)
