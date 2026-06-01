<div align="center">

# 🎾 Tennis

**Be the ultimate tennis expert**

Live Scores · Deep Analytics · Match Alerts · All Major Tours in One Place

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)

</div>

---

## Overview

Tennis is a full-featured tracking platform for tennis fans. Real-time scores, in-depth player stats, smart match alerts, and highlight replays — everything you need in one place.

> Trusted by 50,000+ fans across all ATP & WTA tours.

---

## Features

| Feature | Description |
|---------|-------------|
| ⚡ **Millisecond Live Scores** | 3× faster than official sites — WebSocket push with < 0.3s latency |
| 📊 **Deep Data Analytics** | Serve speed, break rate, ace count — stats down to every single point |
| 📅 **Smart Match Calendar** | Full-year schedule at a glance, with push notifications 30 min before each match |
| 👤 **Player Profiles** | 1000+ active ATP/WTA players — career records, current form, playing style |
| 🎬 **Highlight Replays** | Key points, break points, and deciding set moments — rewatch anytime |
| 📈 **Live Rankings** | Weekly point changes, ranking trajectories, and year-end qualification races |

---

## Tech Stack

```
Framework       React 19
Build Tool      Vite 6
Styling         TailwindCSS 4 (Vite plugin) + CSS variable design system
Components      shadcn/ui (Radix primitives + nature theme)
Animation       Framer Motion (Spring physics, Apple-quality motion)
Routing         React Router v7
Auth & Backend  Supabase (Google OAuth)
WebGL           Three.js (Navier-Stokes fluid simulation in Hero)
Icons           lucide-react / react-icons
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/infinite-oreo/tennis.git
cd tennis

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Supabase Project URL and anon key

# 4. Start the dev server
npm run dev
```

Open `http://localhost:5173`

### Environment Variables

Get your credentials from [Supabase Dashboard](https://app.supabase.com) → Project Settings → API:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

> After editing `.env`, restart the dev server — Vite only injects env vars at startup.

---

## Pricing

| | Free | Pro | Team |
|--|:----:|:---:|:----:|
| Price | ¥0 | ¥38/mo | ¥88/mo |
| Live score tracking | 5 matches/mo | Unlimited | Unlimited |
| Deep data analytics | — | ✓ | ✓ |
| Highlight replays | — | ✓ | ✓ |
| Ad-free experience | — | ✓ | ✓ |
| Accounts | 1 | 1 | Up to 10 |
| API data access | — | — | ✓ |

---

## Project Structure

```
tennis/
├── src/
│   ├── components/
│   │   ├── landing/     # Landing page sections (Hero · Features · Pricing · FAQ...)
│   │   ├── layout/      # Header · Footer
│   │   ├── auth/        # Google OAuth login components
│   │   ├── effects/     # WebGL backgrounds (LiquidEther · PixelSnow)
│   │   └── ui/          # shadcn/ui base components
│   ├── pages/           # Route pages (LandingPage · Home · DesignSystem)
│   ├── contexts/        # AuthContext (Supabase session state)
│   ├── lib/             # supabase.js · auth.js · motion.js · utils.js
│   └── index.css        # Design system CSS variables (nature theme tokens)
├── public/
├── .env                 # Local credentials (not committed)
└── vite.config.js
```

---

## Commands

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Production build
npm run preview  # Preview production build locally
```

---

<div align="center">

Made with ❤️ for tennis fans everywhere

</div>
