<div align="center">

# 🎾 Tennis

**让每一位球迷都成为真正的行家**

实时比分 · 深度数据 · 赛事直播 · 一站掌握全球顶级赛事动态

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)

</div>

---

## 概览

Tennis 是一款面向网球球迷的全功能追踪平台。从毫秒级实时比分到深度球员数据，从智能赛事提醒到精彩集锦回放，一个平台解决所有需求。

> 50,000+ 球迷的选择，覆盖全部 ATP/WTA 赛事。

---

## 功能

| 功能 | 描述 |
|------|------|
| ⚡ **毫秒级实时比分** | 比官方网站快 3 倍的数据更新，WebSocket 推送延迟 < 0.3s |
| 📊 **深度数据分析** | 发球速度、破发率、ACE 球统计，数据颗粒度达到每分球 |
| 📅 **智能赛事日历** | 全年赛程一目了然，比赛开始前 30 分钟自动推送提醒 |
| 👤 **球员深度档案** | 覆盖 ATP/WTA 1000+ 在役球员，历史战绩与技术风格全收录 |
| 🎬 **精彩集锦回放** | 关键分、破发点、决胜局高光，随时回看不遗漏任何精彩 |
| 📈 **世界排名实时** | 每周积分变动、晋升轨迹、年终总决赛资格竞争态势追踪 |

---

## 技术栈

```
前端框架    React 19
构建工具    Vite 6
样式系统    TailwindCSS 4（Vite 插件版）+ CSS 变量设计系统
组件库      shadcn/ui（Radix 无障碍原语 + nature 主题）
动效引擎    Framer Motion（Spring 物理动画，Apple 级动效）
路由        React Router v7
认证后端    Supabase（Google OAuth）
WebGL       Three.js（Hero 区 Navier-Stokes 流体背景）
图标        lucide-react / react-icons
```

---

## 本地运行

**前置要求：** Node.js 18+

```bash
# 1. 克隆仓库
git clone https://github.com/infinite-oreo/tennis.git
cd tennis

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 填入 Supabase Project URL 和 anon key

# 4. 启动开发服务器
npm run dev
```

访问 `http://localhost:5173`

### 环境变量

在 [Supabase 控制台](https://app.supabase.com) → Project Settings → API 获取以下凭证：

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

> 修改 `.env` 后需重启开发服务器，Vite 仅在启动时注入环境变量。

---

## 定价

| | 免费版 | Pro 版 | 团队版 |
|--|:------:|:------:|:------:|
| 价格 | ¥0 | ¥38/月 | ¥88/月 |
| 实时比分追踪 | 5 场/月 | 无限 | 无限 |
| 深度数据分析 | — | ✓ | ✓ |
| 精彩集锦回放 | — | ✓ | ✓ |
| 无广告体验 | — | ✓ | ✓ |
| 账号数量 | 1 | 1 | 最多 10 |
| API 数据接入 | — | — | ✓ |

---

## 项目结构

```
tennis/
├── src/
│   ├── components/
│   │   ├── landing/     # 落地页各 Section（Hero · Features · Pricing · FAQ...）
│   │   ├── layout/      # Header · Footer 通用布局
│   │   ├── auth/        # Google OAuth 登录组件
│   │   ├── effects/     # WebGL 流体背景（LiquidEther · PixelSnow）
│   │   └── ui/          # shadcn/ui 基础组件
│   ├── pages/           # 路由页面（LandingPage · Home · DesignSystem）
│   ├── contexts/        # AuthContext（Supabase 会话状态）
│   ├── lib/             # supabase.js · auth.js · motion.js · utils.js
│   └── index.css        # 设计系统 CSS 变量（nature 主题 token）
├── public/
├── .env                 # 本地凭证（不入库）
└── vite.config.js
```

---

## 可用命令

```bash
npm run dev      # 启动开发服务器（热更新）
npm run build    # 生产构建
npm run preview  # 本地预览生产构建
```

---

<div align="center">

Made with ❤️ for tennis fans everywhere

</div>
