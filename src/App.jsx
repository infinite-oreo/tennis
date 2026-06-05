/**
 * [INPUT]: 依赖 react-router-dom 的路由，依赖 framer-motion 的 AnimatePresence/motion，依赖 @/lib/motion 的 pageTransition，依赖 pages/* 的页面组件
 * [OUTPUT]: 导出 App 根组件，包含完整路由树与内页路由过渡
 * [POS]: 应用根组件，路由树顶层，被 main.jsx 唯一消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import LandingPage from "@/pages/LandingPage";
import DesignSystem from "@/pages/DesignSystem";
import PlayersPage from "@/pages/PlayersPage";
import EventsPage from "@/pages/EventsPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";

/* 路由页过渡包裹器：进场 Spring 落定，退场短促利落 */
function Page({ children }) {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

/* 内页路由：AnimatePresence 以 pathname 为 key，mode="wait" 串行过渡 */
function InnerRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/home" element={<Page><Home /></Page>} />
        <Route path="/events" element={<Page><EventsPage /></Page>} />
        <Route path="/players" element={<Page><PlayersPage /></Page>} />
        <Route path="/design-system" element={<Page><DesignSystem /></Page>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 落地页：自带 Header + Footer，单页无需路由过渡 */}
        <Route path="/" element={<LandingPage />} />

        {/* 内页：共享 layout Header/Footer，内部路由带丝滑过渡 */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <Header />
              <div className="flex-1">
                <InnerRoutes />
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
