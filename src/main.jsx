/**
 * [INPUT]: 依赖 ./App.jsx 的根组件，依赖 ./index.css 的全局样式，依赖 framer-motion 的 MotionConfig，依赖 @/contexts/AuthContext 的 AuthProvider
 * [OUTPUT]: 无导出，挂载 React 应用到 #root DOM 节点
 * [POS]: 应用入口，唯一挂载点，被 index.html 的 <script type="module"> 调用；全局植入 reducedMotion 可访问性与 Auth 状态
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { AuthProvider } from '@/contexts/AuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* reducedMotion="user" —— 跟随系统 prefers-reduced-motion，关怀前庭敏感用户 */}
    <MotionConfig reducedMotion="user">
      {/* AuthProvider —— 登录状态的河流之源，包裹全树 */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </MotionConfig>
  </StrictMode>,
)
