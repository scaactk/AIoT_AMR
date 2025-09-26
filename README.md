# AMR Monitor

A Next.js dashboard for monitoring antimicrobial resistance (AMR) data with interactive maps and trends.

## Features

- Interactive Map (Mapbox GL)
- Charts and trend visualizations
- MongoDB backend for storing AMR data and geo points
- Admin pages for warnings and identification

## Quickstart

1. Install dependencies

```bash
npm install
```

2. Create environment variables

Create a `.env.local` in the project root and add:

```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
MONGODB_URI=your_mongodb_connection_string
```

- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is required to render the Mapbox map in the browser.
- `MONGODB_URI` is used by the API routes to connect to your MongoDB instance.

3. Run the development server

```bash
npm run dev
```

4. Open the app

Visit http://localhost:3000 in your browser.

## Notes & Security

- The Mapbox token used in the browser should be a public token (starts with `pk.`). Do not commit private keys or full admin tokens.
- If you accidentally committed secrets (like a token) to git history, consider rotating the token and using tools like `git filter-repo` or `bfg` to remove it from history.

## Deployment

This app is ready to deploy to Vercel. Make sure to set the environment variables in the hosting provider (NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN and MONGODB_URI).

## Files of interest

- `pages/map.js` — Map page (Mapbox GL integration)
- `pages/index.js` — Dashboard
- `lib/mongodb.js` — MongoDB helper
- `pages/api/*` — Serverless API routes for data, geoPoints, warnings

## Next steps

- Rotate Mapbox token if it was committed.
- Add `.env.example` to the repo to document required env vars without secrets.
