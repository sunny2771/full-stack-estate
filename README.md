# Full Stack Estate

Real estate listings app with auth, maps, and chat. This is my copy of the [Lama Dev full-stack estate tutorial](https://github.com/safak/full-stack-estate) ([YouTube](https://www.youtube.com/watch?v=eJ3YysWaP_A)).

**Stack:** React (Vite), Node, Express, Prisma, MongoDB, Socket.io.

## Local development

Copy `api/.env.example` to `api/.env` and set `DATABASE_URL` plus `JWT_SECRET_KEY`.

```bash
cd api && npm install && node app.js
cd client && npm install && npm run dev
```

API: `http://localhost:8800` · Client: `http://localhost:5173` (or the port Vite prints).

## Production

- **API** (Express + Socket.io + Prisma): Render Web Service, root `api/`
- **Frontend**: Render Static Site, root `client/`, build `npm install && npm run build`

Set `DATABASE_URL` and `JWT_SECRET_KEY` on the API service only. Set `CLIENT_URL` to the live frontend origin. Set `VITE_API_URL` (ending in `/api`) and `VITE_SOCKET_URL` (API origin, no `/api`) on the static site.
