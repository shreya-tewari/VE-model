# VE Model Advisor - Backend (FastAPI)

No Docker required. SQLite by default, so there's nothing else to install or run.

## Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env           # then edit SECRET_KEY at minimum
uvicorn app.main:app --reload
```

API is now at http://localhost:8000, interactive docs at http://localhost:8000/docs.

On first run, tables are created automatically from the SQLAlchemy models
(`Base.metadata.create_all`). Once you need real migrations (e.g. against a
shared Postgres DB later), switch to Alembic:

```bash
alembic revision --autogenerate -m "message"
alembic upgrade head
```

## Structure

```
app/
  api/         route handlers (auth, users, dashboard, contact, reports)
  models/      SQLAlchemy ORM models
  schemas/     Pydantic request/response schemas
  services/    business logic (auth, the scoring engine, email notifier)
  database/    engine/session + declarative base
  middleware/  request logging + uniform error responses
  utils/       password hashing + JWT helpers
  config.py    settings loaded from .env
  dependencies.py  auth dependency (get_current_user, etc.)
  main.py      app instance, middleware, router registration
```

## Endpoints

- `POST /api/auth/register` - create an account
- `POST /api/auth/login` - OAuth2 password flow, returns a JWT
- `GET  /api/users/me` - current user profile
- `POST /api/reports/score` - run the diagnostic engine on quiz answers, save the report
- `GET  /api/reports` / `GET /api/reports/{id}` - list / fetch saved reports
- `GET  /api/dashboard/summary` - aggregated stats for the dashboard page
- `POST /api/contact` - public contact form submission
