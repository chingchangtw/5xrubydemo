## Context

Greenfield drink ordering web app. Stack: Next.js 16 (App Router, TypeScript) frontend at `src/frontend/`, Python FastAPI backend at `src/backend/`. No existing code or data model to migrate. PostgreSQL for persistence. All API calls from the browser go to FastAPI; Next.js has no server-side API routes of its own.

## Goals / Non-Goals

**Goals:**
- Customer-facing menu browsing and cart/checkout flow
- Staff order queue view with real-time status updates
- Admin CRUD for menu management
- Responsive web UI (mobile-first)

**Non-Goals:**
- Payment integration
- Native mobile apps
- Multi-tenant / multi-location
- Loyalty or promotion system

## Decisions

### API Architecture: REST over FastAPI

Use RESTful endpoints under `/api/v1/` served by FastAPI. Next.js frontend calls these directly via a typed API client (`src/frontend/services/api.ts`). No GraphQL — the data shape is predictable and REST is simpler to implement and document for this scope.

### Data Model: Four Core Tables

```
categories (id, name, display_order, active)
drinks     (id, category_id, name, description, base_price, image_url, active)
options    (id, drink_id, type [size|sugar|ice|topping], label, price_delta)
orders     (id, status [pending|preparing|ready|completed], created_at, note)
order_items(id, order_id, drink_id, quantity, unit_price, customizations jsonb)
```

`customizations` stored as JSONB to avoid a wide join for every order query; acceptable since customizations are read-only after order placement.

### Authentication: Role-based via JWT

Two roles: `staff` and `admin`. Customers are anonymous (no account required). Staff/admin authenticate via a simple login endpoint; JWT stored in `httpOnly` cookie. Next.js middleware checks the cookie for protected `/orders` and `/admin` routes.

### Real-time Order Updates: Server-Sent Events (SSE)

Staff order queue needs live updates without polling. Use SSE (`GET /api/v1/orders/stream`) — simpler than WebSockets for a one-way server-push flow. Next.js `EventSource` hook on the staff page.

### State Management: React Context + SWR

Cart state lives in a React Context provider (client-side only, no server sync). Menu data and order data fetched with SWR for automatic revalidation. No Redux or Zustand — scope doesn't justify it.

## Risks / Trade-offs

- [JSONB customizations] → If reporting on customizations is needed later, JSONB queries are harder than normalized tables. Mitigation: acceptable for v1; normalize in a future change if needed.
- [SSE scaling] → SSE connections are stateful; won't scale horizontally without a pub/sub layer. Mitigation: single-server deployment for v1; document this limitation.
- [Anonymous orders] → No customer account means no order history for customers. Mitigation: staff can look up by order ID; accepted as v1 scope.

## Migration Plan

1. Run DB migrations via Alembic (`alembic upgrade head`) on first deploy
2. Seed categories and sample drinks via `scripts/seed.py`
3. No rollback complexity — greenfield deployment, no existing data
