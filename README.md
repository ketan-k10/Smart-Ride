# Smart-Ride 🚗

A full-stack, real-time ride-hailing application — riders book trips, captains accept and complete them, with live matching over WebSockets. Built with the MERN stack and Socket.IO, designed mobile-first.

**Live demo:** https://smart-ride-ketan.netlify.app

> Try it instantly with the **"Try demo as Rider"** and **"Try demo as Captain"** buttons on the login pages — no signup needed.
>
> | Role | Email | Password |
> |------|-------|----------|
> | Rider | `demo@smartride.com` | `demo1234` |
> | Captain | `captain@smartride.com` | `demo1234` |
>
> _Note: the backend runs on a free tier that sleeps when idle, so the first request after a while may take ~30–50s to wake up._

---

## Features

- **Two roles** — separate rider and captain apps with JWT authentication.
- **Live location search & fare estimates** — powered by the Google Maps API.
- **Real-time ride matching** — captains receive nearby ride requests instantly via Socket.IO.
- **Vehicle choices** — Car, Moto, and Auto, each with its own fare.
- **OTP-verified trips** — the captain confirms the rider's OTP before starting the ride.
- **Mobile-first UI** — a clean phone-frame layout that adapts to real devices.
- **One-click demo logins** — for quick, credential-free evaluation.

## Tech stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React, Vite, Tailwind CSS, React Router, Axios, Socket.IO client, Google Maps (`@react-google-maps/api`) |
| Backend | Node.js, Express, MongoDB (Mongoose), Socket.IO, JWT, bcryptjs, express-validator |
| Infra | Netlify (frontend), Render (backend), MongoDB Atlas (database) |

## Project structure

```
Smart-Ride/
├── Backend/          # Express + Socket.IO API
│   ├── controllers/  # Request handlers
│   ├── models/       # Mongoose schemas (user, captain, ride, blacklistToken)
│   ├── routes/       # API route definitions
│   ├── services/     # Business logic (maps, rides, auth)
│   ├── middlewares/  # Auth middleware
│   ├── socket.js     # Socket.IO setup
│   └── server.js     # Entry point
├── frontend/         # React (Vite) client
│   └── src/
│       ├── pages/        # Route screens (Home, login/signup, riding, etc.)
│       ├── components/   # UI panels & shared components
│       └── context/      # User / Captain / Socket context providers
├── DEPLOY.md         # Step-by-step deployment guide
└── README.md
```

## Getting started (local)

**Prerequisites:** Node.js 18+, a MongoDB connection string (local or Atlas), and a Google Maps API key.

### 1. Clone

```bash
git clone https://github.com/ketan-k10/Smart-Ride.git
cd Smart-Ride
```

### 2. Backend

```bash
cd Backend
npm install
cp .env.example .env      # then fill in the values
npm start                 # runs on http://localhost:4000
```

Required variables (see `Backend/.env.example`):

| Variable | Description |
|----------|-------------|
| `DB_CONNECT` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs |
| `GOOGLE_MAPS_API` | Google Maps key (server-side) |
| `PORT` | Port (defaults to injected value / 3000) |

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env      # then fill in the values
npm run dev               # runs on http://localhost:5173
```

Required variables (see `frontend/.env.example`):

| Variable | Description |
|----------|-------------|
| `VITE_BASE_URL` | Backend URL (also used for the Socket.IO connection) |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps key (browser-side) |

## API overview

Base URL: `VITE_BASE_URL` (e.g. `http://localhost:4000`). Protected routes require an `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register a rider |
| POST | `/users/login` | Rider login |
| GET | `/users/profile` | Get logged-in rider _(auth)_ |
| GET | `/users/logout` | Rider logout _(auth)_ |
| POST | `/captains/register` | Register a captain |
| POST | `/captains/login` | Captain login |
| GET | `/captains/profile` | Get logged-in captain _(auth)_ |
| GET | `/captains/logout` | Captain logout _(auth)_ |
| GET | `/maps/get-suggestions` | Autocomplete location suggestions _(auth)_ |
| GET | `/maps/get-coordinates` | Geocode an address _(auth)_ |
| GET | `/maps/get-distance-time` | Distance & ETA between two points _(auth)_ |
| POST | `/rides/create` | Create a ride request _(auth)_ |
| GET | `/rides/get-fare` | Estimate fares per vehicle type _(auth)_ |
| POST | `/rides/confirm` | Captain accepts a ride _(auth)_ |
| GET | `/rides/start-ride` | Start a ride with OTP _(auth)_ |
| POST | `/rides/end-ride` | Complete a ride _(auth)_ |

See [`Backend/README.md`](./Backend/README.md) for detailed request/response formats.

## Deployment

Frontend → Netlify, backend → Render, database → MongoDB Atlas. Full walkthrough in [`DEPLOY.md`](./DEPLOY.md).

## License

Released under the MIT License. See [`LICENSE`](./LICENSE).
