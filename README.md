# Smart-Ride 🚗

A full-stack, real-time **ride-hailing application** — riders book trips and captains accept and complete them, matched live over WebSockets. It's a complete two-sided marketplace (rider app + captain app + backend) built with the MERN stack and Socket.IO, designed mobile-first.

**🔗 Live demo:** https://smart-ride-ketan.netlify.app

> Try it instantly with the **"Try demo as Rider"** and **"Try demo as Captain"** buttons on the login pages — no signup needed.
>
> | Role | Email | Password |
> |------|-------|----------|
> | Rider | `demo@smartride.com` | `demo1234` |
> | Captain | `captain@smartride.com` | `demo1234` |
>
> _The backend runs on a free tier that sleeps when idle, so the first request after a while may take ~30–50s to wake up._

---

## What it does

Smart-Ride recreates the core of an app like Uber, end to end:

- A **rider** signs in, enters a pickup and destination (with live address autocomplete), sees fare estimates for different vehicle types, and books a ride.
- A **captain** signs in and receives that ride request **in real time**, accepts it, verifies the rider's OTP, and completes the trip.
- Both sides stay in sync live through **WebSockets** — no page refreshing.

## Features

- **Two-sided app** — separate rider and captain experiences, each with JWT authentication.
- **Live location search & fare estimates** — address autocomplete and distance/time via the Google Maps API.
- **Real-time ride matching** — captains receive nearby requests instantly over Socket.IO; riders get live status updates.
- **Vehicle choices** — Car, Moto, and Auto, each priced separately.
- **OTP-verified trips** — the captain confirms the rider's OTP before the ride starts.
- **🎙️ Voice booking (AI)** — book a ride by speaking ("*Book a bike from MG Road to the airport*"); audio is sent to Google **Gemini**, which extracts the pickup, destination, and vehicle type, then the app fills everything in and drops you on the confirm screen. _(Newest feature — currently on the `feature/voice-booking` branch.)_
- **Mobile-first UI** — a clean phone-frame layout that adapts to real devices.
- **One-click demo logins** — for quick, credential-free evaluation.

## How it works

```
 Rider app ──► Express API ──► MongoDB          Google Maps API (geocoding, distance, autocomplete)
     ▲             │  ▲                          Google Gemini (voice → structured booking)
     │             ▼  │
     └───────  Socket.IO  ───────► Captain app
            (real-time ride events)
```

1. Rider creates a ride → backend computes fare (Maps) and stores it with an OTP.
2. Backend emits a `new-ride` event → nearby captains get it live.
3. Captain accepts → rider is notified (`ride-confirmed`).
4. Captain enters the rider's OTP → ride starts (`ride-started`); on completion → `ride-ended`.

## Tech stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React, Vite, Tailwind CSS, React Router, Axios, Socket.IO client, Google Maps (`@react-google-maps/api`) |
| **Backend** | Node.js, Express, Socket.IO, MongoDB + Mongoose, JWT auth, bcryptjs, express-validator |
| **AI / APIs** | Google Gemini (voice intent), Google Maps Platform |
| **Infrastructure** | Netlify (frontend), Render (backend), MongoDB Atlas (database) |

## Engineering highlights

- **Real-time, room-based Socket.IO** — users/captains join by id so ride events reach exactly the right client.
- **Stateless JWT auth** with a token blacklist for logout, guarded by Express middleware.
- **Resilient API** — a global async error handler returns clean JSON instead of crashing the worker.
- **Structured LLM output** — Gemini is constrained with a JSON schema so voice input yields reliable `{ pickup, destination, vehicleType }`.
- **Deployed for real** — split hosting (static frontend + always-on WebSocket backend + managed DB) with environment-based config.

## Project structure

```
Smart-Ride/
├── Backend/          # Express + Socket.IO API
│   ├── controllers/  # Request handlers
│   ├── models/       # Mongoose schemas (user, captain, ride, blacklistToken)
│   ├── routes/       # API route definitions
│   ├── services/     # Business logic (maps, rides, auth, AI)
│   ├── middlewares/  # Auth middleware
│   ├── socket.js     # Socket.IO setup
│   └── server.js     # Entry point
├── frontend/         # React (Vite) client
│   └── src/
│       ├── pages/        # Route screens (Home, login/signup, riding, captain views)
│       ├── components/   # UI panels & shared components
│       └── context/      # User / Captain / Socket context providers
├── DEPLOY.md         # Step-by-step deployment guide
└── README.md
```

## Getting started (local)

**Prerequisites:** Node.js 18+, a MongoDB connection string (local or Atlas), and a Google Maps API key.

```bash
git clone https://github.com/ketan-k10/Smart-Ride.git
cd Smart-Ride
```

**Backend**
```bash
cd Backend
npm install
cp .env.example .env      # fill in the values
npm start                 # http://localhost:4000
```

**Frontend**
```bash
cd frontend
npm install
cp .env.example .env      # fill in the values
npm run dev               # http://localhost:5173
```

Environment variables are documented in each folder's `.env.example`.

## API overview

Base URL: `VITE_BASE_URL` (e.g. `http://localhost:4000`). Protected routes require an `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` · `/users/login` | Rider auth |
| POST | `/captains/register` · `/captains/login` | Captain auth |
| GET | `/maps/get-suggestions` · `/get-coordinates` · `/get-distance-time` | Maps helpers _(auth)_ |
| POST | `/rides/create` | Create a ride request _(auth)_ |
| GET | `/rides/get-fare` | Estimate fares per vehicle type _(auth)_ |
| POST | `/rides/confirm` · `/rides/end-ride` | Captain accepts / completes _(auth)_ |
| GET | `/rides/start-ride` | Start a ride with OTP _(auth)_ |

Full request/response details are in [`Backend/README.md`](./Backend/README.md).

## Deployment

Frontend → Netlify, backend → Render, database → MongoDB Atlas. Full walkthrough in [`DEPLOY.md`](./DEPLOY.md).

## License

Released under the MIT License. See [`LICENSE`](./LICENSE).
