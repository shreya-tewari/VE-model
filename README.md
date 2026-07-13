# VE Model Advisor - rebuild

A full-stack rebuild of the "Mobile App Model Advisor" diagnostic tool:
a quiz-style wizard (Client walkthrough + BDM qualification) that scores
answers into a recommended engagement model, package fit, confidence
score, effort range, red flags and responsibility boundaries.

No Docker anywhere. Two plain processes: a FastAPI backend and a Vite/React
frontend, both runnable with standard tooling.

## Stack

- **Backend**: FastAPI + SQLAlchemy + SQLite + JWT auth (Python)
- **Frontend**: React + TypeScript + Vite + Tailwind CSS

## Run it

**Backend** (terminal 1):
```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # edit SECRET_KEY before anything real
uvicorn app.main:app --reload
```
Runs at http://localhost:8000 (docs at /docs).

**Frontend** (terminal 2):
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Runs at http://localhost:5173 and talks to the backend automatically
(Vite proxies `/api` to `localhost:8000`, and `VITE_API_BASE_URL` is
already set for direct calls too).

## Using it

1. Register an account at `/register` (this tool is used internally by BDMs,
   so both quiz flows require login - the "no sign-in" note on the original
   site referred to not persisting data, which this rebuild now does via
   the dashboard).
2. Run the **Client walkthrough** or **BDM qualification** from the homepage.
3. Get a scored report (recommended model, package fit, confidence, effort
   range, red flags, responsibility boundaries) - printable/exportable.
4. See everything on `/dashboard`: totals, model distribution, recent reports.
5. `/contact` posts to the backend and is visible as an open-item count on
   the dashboard.

## Project layout

```
backend/    FastAPI app (see backend/README.md for details)
frontend/   React + Vite app
```

## Notes on what changed vs. the original

- The original was a client-only tool that only saved to the browser. This
  rebuild adds a real backend so reports and contact submissions persist
  and are queryable, with auth so a BDM's saved reports don't leak to
  another BDM.
- The scoring engine (`backend/app/services/scoring_service.py`) is a
  transparent, rule-based model rather than a black box, so the reasoning
  behind a recommendation can be explained on a call.
- Swap `DATABASE_URL` in `backend/.env` to point at Postgres later without
  changing any code - SQLAlchemy handles both. Alembic is wired up for
  when you need real migrations.
