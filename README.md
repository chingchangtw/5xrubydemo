# Project

## Stack
- **Frontend**: Next.js (React + TypeScript) — `src/frontend/`
- **Backend**: Python + FastAPI — `src/backend/`

## Quick start
```bash
# Frontend
cd src/frontend && npm install && npm run dev     # :3000

# Backend
cd src/backend && pip install -r requirements.txt
uvicorn app.main:app --reload                     # :8000

# Full stack
docker compose up --build
```
