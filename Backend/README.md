# Smart-Ride — Backend API

Express + Socket.IO REST API for [Smart-Ride](../README.md).

- **Base URL (local):** `http://localhost:4000`
- **Auth:** protected routes require an `Authorization: Bearer <token>` header (the JWT returned by login/register).
- **Content type:** `application/json`

## Setup

```bash
npm install
cp .env.example .env      # fill in the values
npm start                 # http://localhost:4000
```

| Variable | Description |
|----------|-------------|
| `DB_CONNECT` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs |
| `GOOGLE_MAPS_API` | Google Maps key (server-side) |
| `PORT` | Port (defaults to 3000; hosts usually inject this) |

---

## Users

### `POST /users/register`
Register a rider.

```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "secret123"
}
```
**Validation:** `firstname` ≥ 3 chars, valid `email`, `password` ≥ 6 chars.
**Response `201`:** `{ "token": "<jwt>", "user": { ... } }`

### `POST /users/login`
```json
{ "email": "john@example.com", "password": "secret123" }
```
**Response `200`:** `{ "token": "<jwt>", "user": { ... } }` · **`401`** on bad credentials.

### `GET /users/profile` _(auth)_
Returns the authenticated user.

### `GET /users/logout` _(auth)_
Clears the token cookie and blacklists the JWT.

---

## Captains

### `POST /captains/register`
```json
{
  "fullname": { "firstname": "Jane", "lastname": "Smith" },
  "email": "jane@example.com",
  "password": "secret123",
  "vehicle": { "color": "Black", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
}
```
**Validation:** names/password as above; `vehicle.color` & `vehicle.plate` ≥ 3 chars, `vehicle.capacity` ≥ 1, `vehicle.vehicleType` ∈ `car | motorcycle | auto`.
**Response `201`:** `{ "token": "<jwt>", "captain": { ... } }`

### `POST /captains/login`
```json
{ "email": "jane@example.com", "password": "secret123" }
```
**Response `200`:** `{ "token": "<jwt>", "captain": { ... } }`

### `GET /captains/profile` _(auth)_
Returns the authenticated captain.

### `GET /captains/logout` _(auth)_
Clears the token cookie and blacklists the JWT.

---

## Maps _(all auth)_

Backed by the Google Maps API.

| Endpoint | Query params | Returns |
|----------|--------------|---------|
| `GET /maps/get-suggestions` | `input` (≥ 3 chars) | Autocomplete address suggestions |
| `GET /maps/get-coordinates` | `address` (≥ 3 chars) | `{ ltd, lng }` for the address |
| `GET /maps/get-distance-time` | `origin`, `destination` | Distance and estimated time |

---

## Rides

### `POST /rides/create` _(auth: user)_
```json
{ "pickup": "...", "destination": "...", "vehicleType": "car" }
```
`vehicleType` ∈ `auto | car | moto`. Creates a ride (with OTP) and notifies nearby captains via Socket.IO.

### `GET /rides/get-fare` _(auth: user)_
Query: `pickup`, `destination`. Returns estimated fares per vehicle type, e.g. `{ "auto": 90, "car": 140, "moto": 65 }`.

### `POST /rides/confirm` _(auth: captain)_
```json
{ "rideId": "<mongoId>" }
```
Captain accepts the ride; the rider is notified (`ride-confirmed`).

### `GET /rides/start-ride` _(auth: captain)_
Query: `rideId`, `otp` (6 digits). Starts the ride after OTP verification; the rider is notified (`ride-started`).

### `POST /rides/end-ride` _(auth: captain)_
```json
{ "rideId": "<mongoId>" }
```
Completes the ride; the rider is notified (`ride-ended`).

---

## Socket.IO events

**Client → server**
| Event | Payload | Purpose |
|-------|---------|---------|
| `join` | `{ userId, userType }` | Register the socket for a user or captain |
| `update-location-captain` | `{ userId, location: { ltd, lng } }` | Push the captain's live location |

**Server → client**
| Event | Sent to | When |
|-------|---------|------|
| `new-ride` | nearby captains | A rider creates a ride |
| `ride-confirmed` | the rider | A captain accepts |
| `ride-started` | the rider | The ride starts (OTP verified) |
| `ride-ended` | the rider | The ride is completed |
