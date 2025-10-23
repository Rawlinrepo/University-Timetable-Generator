# University Timetable Generator

Stack:
- Frontend: React (Vite) + Tailwind
- Backend: Node.js + Express + Prisma (PostgreSQL)
- DB: PostgreSQL

## Quick start (local)

1. Start PostgreSQL:
   - Using Docker Compose: `docker-compose up -d`
   - Or run a PostgreSQL database and set `DATABASE_URL` .env accordingly.

2. Backend:
   - `cd backend`
   - Install: `pnpm install` (or `npm install` / `yarn`)
   - Create `.env` (copy from `.env.example`) and set DATABASE_URL.
   - Run migrations:
     - `pnpm prisma generate`
     - `pnpm prisma migrate dev --name init` (or `prisma db push`)
   - Seed sample data (optional): `pnpm run seed`
   - Start dev server: `pnpm dev` (runs on port 4000)

3. Frontend:
   - `cd frontend`
   - `pnpm install`
   - Start: `pnpm dev` (Vite runs on 5173)

API base: `http://localhost:4000/api`

Endpoints (examples):
- `POST /api/courses`
- `POST /api/subjects`
- `POST /api/faculties`
- `POST /api/classrooms`
- `GET /api/timetable` - read generated
- `POST /api/timetable/generate` - generate timetable
