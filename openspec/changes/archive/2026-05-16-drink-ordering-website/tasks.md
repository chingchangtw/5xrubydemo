## 1. Database & Backend Setup

- [x] 1.1 Create Alembic migration for categories, drinks, options, orders, and order_items tables (API Architecture: REST over FastAPI, Data Model: Four Core Tables)
- [x] 1.2 Implement Pydantic models for Category, Drink, Option, Order, OrderItem in src/backend/app/models/
- [x] 1.3 Add JWT authentication middleware and /api/v1/auth/login endpoint with staff/admin role support (Authentication: Role-based via JWT, Staff authentication, Admin authentication)
- [x] 1.4 Create seed script at scripts/seed.py for sample categories and drinks

## 2. Menu Catalog API

- [x] 2.1 Implement GET /api/v1/categories — returns active categories ordered by display_order (Browse drink categories)
- [x] 2.2 Implement GET /api/v1/categories/{id}/drinks — returns active drinks with options for a category (Browse drinks by category)
- [x] 2.3 Implement GET /api/v1/drinks/{id} — returns drink detail including all option groups (View drink customization options, Default customization selection)

## 3. Cart & Order API

- [x] 3.1 Implement POST /api/v1/orders — creates a new order with status pending from submitted cart payload (Submit order)
- [x] 3.2 Validate that cart is non-empty on order creation; return 422 if empty (Empty cart submission attempt)

## 4. Order Management API

- [x] 4.1 Implement GET /api/v1/orders — returns all non-completed orders sorted by created_at asc; staff-auth required (Staff views live order queue)
- [x] 4.2 Implement GET /api/v1/orders/stream — SSE endpoint streaming new and updated orders; staff-auth required (New order arrives while staff is on the queue page, Real-time Order Updates: Server-Sent Events (SSE))
- [x] 4.3 Implement PATCH /api/v1/orders/{id}/status — advances order status through pending→preparing→ready→completed lifecycle; reject invalid transitions with 422 (Staff advances order status, Invalid status transition)

## 5. Admin API

- [x] 5.1 Implement POST/PATCH/DELETE /api/v1/admin/categories — CRUD for categories; admin-auth required (Admin manages categories)
- [x] 5.2 Implement POST/PATCH/DELETE /api/v1/admin/drinks — CRUD for drinks within a category; admin-auth required (Admin manages drinks)
- [x] 5.3 Implement POST/PATCH/DELETE /api/v1/admin/drinks/{id}/options — CRUD for drink options; admin-auth required (Admin manages drink options)
- [x] 5.4 Enforce admin role check; return 403 for staff role on admin endpoints (Staff role cannot access admin panel)

## 6. Frontend — Menu Catalog

- [x] 6.1 Create API client at src/frontend/services/api.ts with typed fetch wrappers for all backend endpoints
- [x] 6.2 Build menu page at src/frontend/app/(routes)/menu — renders category list and drink grid using SWR (Browse drink categories, Browse drinks by category, State Management: React Context + SWR)
- [x] 6.3 Build drink detail modal/drawer — shows name, description, options with price deltas, quantity selector, default first option pre-selected (View drink customization options, Default customization selection)
- [x] 6.4 Handle empty category state with an empty-state message (Category has no active drinks)

## 7. Frontend — Cart & Checkout

- [x] 7.1 Implement CartContext provider at src/frontend/components/cart — stores items in state and syncs to localStorage (Add drink to cart, Persist cart across page reloads)
- [x] 7.2 Build cart page at src/frontend/app/(routes)/cart — lists items with unit price, quantity controls, subtotal, and remove button (View and edit cart)
- [x] 7.3 Implement "Place Order" flow — POST to /api/v1/orders, clear cart, show confirmation with order ID (Submit order, Empty cart submission attempt)
- [x] 7.4 Update cart item count badge in navbar on every cart mutation (Add drink to cart)

## 8. Frontend — Order Management

- [x] 8.1 Build staff login page at src/frontend/app/(routes)/login — POST to /api/v1/auth/login, store JWT in httpOnly cookie (Staff authentication)
- [x] 8.2 Add Next.js 16 middleware to protect /orders and /admin routes; redirect unauthenticated users to /login (Unauthenticated access to orders page)
- [x] 8.3 Build order queue page at src/frontend/app/(routes)/orders — fetches active orders via SWR and subscribes to SSE stream for live updates (Staff views live order queue, New order arrives while staff is on the queue page)
- [x] 8.4 Add status action buttons on each order card to advance status (Staff advances order status)

## 9. Frontend — Admin Panel

- [x] 9.1 Build admin category management page at src/frontend/app/(routes)/admin/categories — list, create, edit, reorder, deactivate (Admin manages categories)
- [x] 9.2 Build admin drink management page at src/frontend/app/(routes)/admin/drinks — list by category, create, edit, deactivate (Admin manages drinks)
- [x] 9.3 Build drink option editor component — inline add/edit/remove options per drink (Admin manages drink options)
- [x] 9.4 Block admin panel routes for staff role; show 403 page (Staff role cannot access admin panel)
