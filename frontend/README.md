# Smart-Ride — Frontend

The React (Vite) client for [Smart-Ride](../README.md). Mobile-first UI built with Tailwind CSS, talking to the Express/Socket.IO backend.

## Setup

```bash
npm install
cp .env.example .env      # fill in the values
npm run dev               # http://localhost:5173
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_BASE_URL` | Backend URL — used for both REST calls and the Socket.IO connection |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps browser key (Maps JavaScript + Places) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Structure

- `src/pages/` — route screens (Home, login/signup, riding, captain views)
- `src/components/` — UI panels and shared components
- `src/context/` — User, Captain, and Socket context providers

See the [root README](../README.md) for the full project overview and deployment guide.
