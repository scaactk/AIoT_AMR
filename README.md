<div align="center">

# AIoT-Enhanced Global AMR Surveillance Platform
**Online system for the paper:**  
**“Artificial Intelligence of Things-Enhanced Automated Surveillance System for Global Antimicrobial Resistance in Food Supply Chain.”**

</div>

This repository contains the Node.js / Next.js implementation of the interactive Antimicrobial Resistance (AMR) monitoring and analytics platform described in the above research work. It integrates data visualization, geospatial intelligence, and automated warning logic to support global AMR risk assessment in the food supply chain.

---

## 1. Core Objectives

- Provide a unified web interface for global AMR geospatial distribution and trend analysis.
- Support ingestion and enrichment of monitoring points (geo + resistance metadata).
- Enable early warning signals and identification workflows for elevated AMR levels.
- Serve as a reproducible reference implementation accompanying the academic paper.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Node.js (LTS) | Server-side execution / Next.js runtime |
| Framework | Next.js 15 (Pages Router) | Full‑stack React application |
| Frontend | React 19, TailwindCSS | UI components & styling |
| Charts | chart.js + react-chartjs-2 | Statistical & temporal visualizations |
| Maps / Geo | mapbox-gl | 3D globe & geospatial interaction |
| Database ODM | Mongoose | Data modeling over MongoDB |
| Database | MongoDB | Persistence for AMR data, geo points, warnings |
| HTTP / Data | Built-in Next.js API routes | Serverless-style endpoints |
| Utilities | axios, html2canvas, react-icons | Data fetch, snapshot, icons |
| Tooling | ESLint, PostCSS, Tailwind, TypeScript types (partial) | Dev productivity & consistency |

---

## 2.1 Visual Overview

Dashboard interface:

<p align="center">
	<img alt="AMR Monitoring Dashboard" src="public/images/dashboard.png" width="900" />
</p>

---

## 3. Repository Structure (Simplified)

```
components/        # Reusable UI components
lib/               # Database / support utilities (e.g. mongodb.js)
models/            # Mongoose schemas (AMRData, GeoPoint, Warning)
pages/             # Next.js pages (dashboard, map, trends, system, API)
scripts/           # Data seeding utilities
styles/            # CSS modules & global styles
public/images/     # Static assets & screenshots
.env.local.example # Example environment variables (no secrets)
```

---

## 4. Prerequisites

| Dependency | Recommended Version | Notes |
|------------|---------------------|-------|
| Node.js | 20 LTS or 22 LTS | Project tested with modern LTS; older 18 may work but not guaranteed |
| npm | 10+ | Comes with Node LTS; pnpm/yarn also fine |
| MongoDB | 7.0+ | Atlas or local deployment |
| Mapbox Account | Valid public token (pk.*) | Required for map rendering |

Why upgraded? AMR workloads benefit from improved V8 performance & security patches in Node 20+/22+. MongoDB 7 adds query performance & time-series improvements useful for longitudinal AMR metrics.

Check versions:
```bash
node -v
npm -v
```

---

## 5. Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/scaactk/AIoT_AMR.git
cd AIoT_AMR
```

2. Install dependencies (this installs Next.js, React, TailwindCSS, Chart.js, Mapbox GL, etc. as declared in `package.json`):
```bash
npm install
```

3. Create environment file:
Copy `.env.local.example` to `.env.local` and fill real values:
```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_public_token_here
MONGODB_URI=mongodb+srv://user:pass@cluster0.example.mongodb.net/amr?retryWrites=true&w=majority
```

4. (Optional) Seed sample data:
```bash
node scripts/seed2.js
node scripts/seedGeoPoints.js
node scripts/seedWarnings.js
```
Adjust scripts if your connection string or schema changes.

5. Start development server:
```bash
npm run dev
```
Visit: http://localhost:3000

6. Production build (optional):
```bash
npm run build
npm start
```

---

## 6. Environment Variables

| Name | Required | Scope | Description |
|------|----------|-------|-------------|
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Yes | Client + Server | Public Mapbox token for mapbox-gl |
| `MONGODB_URI` | Yes | Server | MongoDB connection string |
| `NODE_ENV` | No | Both | Set automatically by Next.js (override if needed) |

Never commit real secrets in `.env.local`; only the example file is tracked.

---

## 7. Data Model (High-Level)

- `GeoPoint` — Location + resistance metadata (amrLevel, resistance spectrum, sample stats).
- `AMRData` — (Extendable) time-series or aggregated resistance indicators.
- `Warning` — Triggered or configured risk notifications.

Extend models in `models/` and corresponding API handlers in `pages/api/` to evolve business logic.

---

## 8. Key Pages & Modules

| Path | Purpose |
|------|---------|
| `/` | Dashboard overview cards & KPIs |
| `/map` | Interactive Mapbox globe & point details |
| `/trends` | Temporal analysis & charts |
| `/identification` | AMR identification workflow |
| `/warning` | Warnings management UI |
| `/api/*` | Data, geoPoints, warnings, identification endpoints |

---

## 9. Security & Operational Notes

- Use only public (`pk.*`) Mapbox tokens in client code.
- Rotate tokens or database credentials immediately if accidentally committed.
- For production: enable proper MongoDB network rules / IP allow-list + user-scoped credentials.
- Consider adding schema & payload validation (e.g. Zod / Joi) before public deployment.

---


## 10. Deployment

Typical options:

| Platform | Notes |
|----------|-------|
| Vercel | Easiest for Next.js; add env vars in dashboard |
| Docker + Any Cloud | Build once; run Node server plus managed MongoDB |
| Kubernetes | For scaling + multi-region setups |

Minimal Dockerfile example (future addition):
```Dockerfile
# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --only=production
# COPY . .
# RUN npm run build
# CMD ["npm", "start"]
```

---

## 11. Citation

If you use this system or derivative work in academic publications, please cite:

> Authors. *Artificial Intelligence of Things-Enhanced Automated Surveillance System for Global Antimicrobial Resistance in Food Supply Chain.* Year, Venue/Journal (to appear).


---


For questions or collaboration requests, open an Issue or Discussion.
