## ADDED Requirements

### Requirement: Staff views live order queue
The system SHALL display all non-completed orders to authenticated staff in real time via SSE.

#### Scenario: Staff opens order queue
- **WHEN** an authenticated staff member navigates to the orders page
- **THEN** all orders with status `pending`, `preparing`, or `ready` SHALL be displayed
- **THEN** orders SHALL be sorted by created_at ascending (oldest first)

#### Scenario: New order arrives while staff is on the queue page
- **WHEN** a customer places a new order
- **THEN** the new order SHALL appear in the staff queue within 2 seconds without a page refresh


<!-- @trace
source: drink-ordering-website
updated: 2026-05-16
code:
  - src/backend/dev.db
  - src/frontend/components/order/OrderCard.tsx
  - src/frontend/README.md
  - src/backend/alembic/env.py
  - src/frontend/components/menu/DrinkDetailModal.tsx
  - .github/skills/spectra-ingest/SKILL.md
  - .agents/skills/spectra-ingest/SKILL.md
  - src/backend/app/routes/__pycache__/admin.cpython-312.pyc
  - src/frontend/proxy.ts
  - src/backend/alembic/script.py.mako
  - src/backend/app/main.py
  - src/backend/alembic.ini
  - src/backend/app/middleware/auth.py
  - src/backend/app/models/menu.py
  - .github/prompts/spectra-discuss.prompt.md
  - src/backend/Dockerfile
  - src/backend/requirements.txt
  - src/backend/app/__pycache__/database.cpython-312.pyc
  - src/frontend/app/favicon.ico
  - src/backend/app/routes/auth.py
  - src/frontend/app/layout.tsx
  - src/backend/app/models/__pycache__/menu.cpython-312.pyc
  - .github/prompts/spectra-ingest.prompt.md
  - src/frontend/app/(routes)/menu/page.tsx
  - src/frontend/app/(routes)/orders/page.tsx
  - src/frontend/package.json
  - src/frontend/app/(routes)/admin/categories/page.tsx
  - src/frontend/next.config.ts
  - src/frontend/app/(routes)/login/page.tsx
  - src/frontend/app/page.tsx
  - .agents/skills/spectra-apply/SKILL.md
  - src/frontend/public/file.svg
  - scripts/seed.py
  - src/frontend/public/vercel.svg
  - .github/skills/spectra-discuss/SKILL.md
  - src/frontend/public/next.svg
  - .github/skills/spectra-propose/SKILL.md
  - .spectra.yaml
  - src/backend/app/models/order.py
  - src/backend/app/routes/__pycache__/auth.cpython-312.pyc
  - src/backend/app/routes/menu.py
  - src/frontend/app/globals.css
  - src/frontend/CLAUDE.md
  - src/frontend/components/cart/CartBadge.tsx
  - src/frontend/tsconfig.json
  - src/backend/app/models/db_models.py
  - src/backend/app/__pycache__/main.cpython-312.pyc
  - src/frontend/public/window.svg
  - .github/skills/spectra-apply/SKILL.md
  - src/backend/app/routes/__pycache__/menu.cpython-312.pyc
  - .agents/skills/spectra-propose/SKILL.md
  - src/frontend/public/globe.svg
  - src/backend/app/models/__pycache__/order.cpython-312.pyc
  - .github/prompts/spectra-propose.prompt.md
  - src/backend/app/routes/admin.py
  - src/frontend/app/(routes)/admin/drinks/page.tsx
  - src/frontend/app/403/page.tsx
  - src/backend/app/models/__pycache__/db_models.cpython-312.pyc
  - src/frontend/app/(routes)/admin/page.tsx
  - src/frontend/app/(routes)/cart/page.tsx
  - src/backend/alembic/versions/001_initial_schema.py
  - .github/prompts/spectra-apply.prompt.md
  - src/backend/app/routes/__pycache__/orders.cpython-312.pyc
  - src/frontend/components/cart/CartContext.tsx
  - src/frontend/services/api.ts
  - .agents/skills/spectra-drift/SKILL.md
  - src/backend/app/database.py
  - src/backend/app/routes/orders.py
  - src/frontend/postcss.config.mjs
  - .github/prompts/spectra-drift.prompt.md
  - src/backend/app/middleware/__pycache__/auth.cpython-312.pyc
  - src/backend/app/routes/__pycache__/__init__.cpython-312.pyc
  - .agents/skills/spectra-discuss/SKILL.md
  - src/frontend/components/menu/OptionEditor.tsx
  - src/frontend/AGENTS.md
  - src/frontend/eslint.config.mjs
  - src/backend/app/routes/__init__.py
  - src/backend/alembic/versions/.gitkeep
  - .github/skills/spectra-drift/SKILL.md
-->

### Requirement: Staff advances order status
The system SHALL allow staff to advance an order through the status lifecycle.

#### Scenario: Staff marks order as preparing
- **WHEN** a staff member clicks "Start Preparing" on a pending order
- **THEN** the order status SHALL change from `pending` to `preparing`

#### Scenario: Staff marks order as ready
- **WHEN** a staff member clicks "Mark Ready" on a preparing order
- **THEN** the order status SHALL change from `preparing` to `ready`

#### Scenario: Staff completes an order
- **WHEN** a staff member clicks "Complete" on a ready order
- **THEN** the order status SHALL change from `ready` to `completed`
- **THEN** the order SHALL be removed from the active queue view

#### Scenario: Invalid status transition
- **WHEN** a staff member attempts to transition an order to a non-sequential status
- **THEN** the system SHALL reject the request with a 422 error

##### Example: valid and invalid transitions
| From      | To          | Allowed |
|-----------|-------------|---------|
| pending   | preparing   | Yes     |
| preparing | ready       | Yes     |
| ready     | completed   | Yes     |
| pending   | ready       | No      |
| completed | pending     | No      |


<!-- @trace
source: drink-ordering-website
updated: 2026-05-16
code:
  - src/backend/dev.db
  - src/frontend/components/order/OrderCard.tsx
  - src/frontend/README.md
  - src/backend/alembic/env.py
  - src/frontend/components/menu/DrinkDetailModal.tsx
  - .github/skills/spectra-ingest/SKILL.md
  - .agents/skills/spectra-ingest/SKILL.md
  - src/backend/app/routes/__pycache__/admin.cpython-312.pyc
  - src/frontend/proxy.ts
  - src/backend/alembic/script.py.mako
  - src/backend/app/main.py
  - src/backend/alembic.ini
  - src/backend/app/middleware/auth.py
  - src/backend/app/models/menu.py
  - .github/prompts/spectra-discuss.prompt.md
  - src/backend/Dockerfile
  - src/backend/requirements.txt
  - src/backend/app/__pycache__/database.cpython-312.pyc
  - src/frontend/app/favicon.ico
  - src/backend/app/routes/auth.py
  - src/frontend/app/layout.tsx
  - src/backend/app/models/__pycache__/menu.cpython-312.pyc
  - .github/prompts/spectra-ingest.prompt.md
  - src/frontend/app/(routes)/menu/page.tsx
  - src/frontend/app/(routes)/orders/page.tsx
  - src/frontend/package.json
  - src/frontend/app/(routes)/admin/categories/page.tsx
  - src/frontend/next.config.ts
  - src/frontend/app/(routes)/login/page.tsx
  - src/frontend/app/page.tsx
  - .agents/skills/spectra-apply/SKILL.md
  - src/frontend/public/file.svg
  - scripts/seed.py
  - src/frontend/public/vercel.svg
  - .github/skills/spectra-discuss/SKILL.md
  - src/frontend/public/next.svg
  - .github/skills/spectra-propose/SKILL.md
  - .spectra.yaml
  - src/backend/app/models/order.py
  - src/backend/app/routes/__pycache__/auth.cpython-312.pyc
  - src/backend/app/routes/menu.py
  - src/frontend/app/globals.css
  - src/frontend/CLAUDE.md
  - src/frontend/components/cart/CartBadge.tsx
  - src/frontend/tsconfig.json
  - src/backend/app/models/db_models.py
  - src/backend/app/__pycache__/main.cpython-312.pyc
  - src/frontend/public/window.svg
  - .github/skills/spectra-apply/SKILL.md
  - src/backend/app/routes/__pycache__/menu.cpython-312.pyc
  - .agents/skills/spectra-propose/SKILL.md
  - src/frontend/public/globe.svg
  - src/backend/app/models/__pycache__/order.cpython-312.pyc
  - .github/prompts/spectra-propose.prompt.md
  - src/backend/app/routes/admin.py
  - src/frontend/app/(routes)/admin/drinks/page.tsx
  - src/frontend/app/403/page.tsx
  - src/backend/app/models/__pycache__/db_models.cpython-312.pyc
  - src/frontend/app/(routes)/admin/page.tsx
  - src/frontend/app/(routes)/cart/page.tsx
  - src/backend/alembic/versions/001_initial_schema.py
  - .github/prompts/spectra-apply.prompt.md
  - src/backend/app/routes/__pycache__/orders.cpython-312.pyc
  - src/frontend/components/cart/CartContext.tsx
  - src/frontend/services/api.ts
  - .agents/skills/spectra-drift/SKILL.md
  - src/backend/app/database.py
  - src/backend/app/routes/orders.py
  - src/frontend/postcss.config.mjs
  - .github/prompts/spectra-drift.prompt.md
  - src/backend/app/middleware/__pycache__/auth.cpython-312.pyc
  - src/backend/app/routes/__pycache__/__init__.cpython-312.pyc
  - .agents/skills/spectra-discuss/SKILL.md
  - src/frontend/components/menu/OptionEditor.tsx
  - src/frontend/AGENTS.md
  - src/frontend/eslint.config.mjs
  - src/backend/app/routes/__init__.py
  - src/backend/alembic/versions/.gitkeep
  - .github/skills/spectra-drift/SKILL.md
-->

### Requirement: Staff authentication
The system SHALL require staff to authenticate before accessing the order queue.

#### Scenario: Unauthenticated access to orders page
- **WHEN** an unauthenticated user navigates to the orders page
- **THEN** the system SHALL redirect them to the login page

## Requirements


<!-- @trace
source: drink-ordering-website
updated: 2026-05-16
code:
  - src/backend/dev.db
  - src/frontend/components/order/OrderCard.tsx
  - src/frontend/README.md
  - src/backend/alembic/env.py
  - src/frontend/components/menu/DrinkDetailModal.tsx
  - .github/skills/spectra-ingest/SKILL.md
  - .agents/skills/spectra-ingest/SKILL.md
  - src/backend/app/routes/__pycache__/admin.cpython-312.pyc
  - src/frontend/proxy.ts
  - src/backend/alembic/script.py.mako
  - src/backend/app/main.py
  - src/backend/alembic.ini
  - src/backend/app/middleware/auth.py
  - src/backend/app/models/menu.py
  - .github/prompts/spectra-discuss.prompt.md
  - src/backend/Dockerfile
  - src/backend/requirements.txt
  - src/backend/app/__pycache__/database.cpython-312.pyc
  - src/frontend/app/favicon.ico
  - src/backend/app/routes/auth.py
  - src/frontend/app/layout.tsx
  - src/backend/app/models/__pycache__/menu.cpython-312.pyc
  - .github/prompts/spectra-ingest.prompt.md
  - src/frontend/app/(routes)/menu/page.tsx
  - src/frontend/app/(routes)/orders/page.tsx
  - src/frontend/package.json
  - src/frontend/app/(routes)/admin/categories/page.tsx
  - src/frontend/next.config.ts
  - src/frontend/app/(routes)/login/page.tsx
  - src/frontend/app/page.tsx
  - .agents/skills/spectra-apply/SKILL.md
  - src/frontend/public/file.svg
  - scripts/seed.py
  - src/frontend/public/vercel.svg
  - .github/skills/spectra-discuss/SKILL.md
  - src/frontend/public/next.svg
  - .github/skills/spectra-propose/SKILL.md
  - .spectra.yaml
  - src/backend/app/models/order.py
  - src/backend/app/routes/__pycache__/auth.cpython-312.pyc
  - src/backend/app/routes/menu.py
  - src/frontend/app/globals.css
  - src/frontend/CLAUDE.md
  - src/frontend/components/cart/CartBadge.tsx
  - src/frontend/tsconfig.json
  - src/backend/app/models/db_models.py
  - src/backend/app/__pycache__/main.cpython-312.pyc
  - src/frontend/public/window.svg
  - .github/skills/spectra-apply/SKILL.md
  - src/backend/app/routes/__pycache__/menu.cpython-312.pyc
  - .agents/skills/spectra-propose/SKILL.md
  - src/frontend/public/globe.svg
  - src/backend/app/models/__pycache__/order.cpython-312.pyc
  - .github/prompts/spectra-propose.prompt.md
  - src/backend/app/routes/admin.py
  - src/frontend/app/(routes)/admin/drinks/page.tsx
  - src/frontend/app/403/page.tsx
  - src/backend/app/models/__pycache__/db_models.cpython-312.pyc
  - src/frontend/app/(routes)/admin/page.tsx
  - src/frontend/app/(routes)/cart/page.tsx
  - src/backend/alembic/versions/001_initial_schema.py
  - .github/prompts/spectra-apply.prompt.md
  - src/backend/app/routes/__pycache__/orders.cpython-312.pyc
  - src/frontend/components/cart/CartContext.tsx
  - src/frontend/services/api.ts
  - .agents/skills/spectra-drift/SKILL.md
  - src/backend/app/database.py
  - src/backend/app/routes/orders.py
  - src/frontend/postcss.config.mjs
  - .github/prompts/spectra-drift.prompt.md
  - src/backend/app/middleware/__pycache__/auth.cpython-312.pyc
  - src/backend/app/routes/__pycache__/__init__.cpython-312.pyc
  - .agents/skills/spectra-discuss/SKILL.md
  - src/frontend/components/menu/OptionEditor.tsx
  - src/frontend/AGENTS.md
  - src/frontend/eslint.config.mjs
  - src/backend/app/routes/__init__.py
  - src/backend/alembic/versions/.gitkeep
  - .github/skills/spectra-drift/SKILL.md
-->

### Requirement: Staff views live order queue
The system SHALL display all non-completed orders to authenticated staff in real time via SSE.

#### Scenario: Staff opens order queue
- **WHEN** an authenticated staff member navigates to the orders page
- **THEN** all orders with status `pending`, `preparing`, or `ready` SHALL be displayed
- **THEN** orders SHALL be sorted by created_at ascending (oldest first)

#### Scenario: New order arrives while staff is on the queue page
- **WHEN** a customer places a new order
- **THEN** the new order SHALL appear in the staff queue within 2 seconds without a page refresh

---
### Requirement: Staff advances order status
The system SHALL allow staff to advance an order through the status lifecycle.

#### Scenario: Staff marks order as preparing
- **WHEN** a staff member clicks "Start Preparing" on a pending order
- **THEN** the order status SHALL change from `pending` to `preparing`

#### Scenario: Staff marks order as ready
- **WHEN** a staff member clicks "Mark Ready" on a preparing order
- **THEN** the order status SHALL change from `preparing` to `ready`

#### Scenario: Staff completes an order
- **WHEN** a staff member clicks "Complete" on a ready order
- **THEN** the order status SHALL change from `ready` to `completed`
- **THEN** the order SHALL be removed from the active queue view

#### Scenario: Invalid status transition
- **WHEN** a staff member attempts to transition an order to a non-sequential status
- **THEN** the system SHALL reject the request with a 422 error

##### Example: valid and invalid transitions
| From      | To          | Allowed |
|-----------|-------------|---------|
| pending   | preparing   | Yes     |
| preparing | ready       | Yes     |
| ready     | completed   | Yes     |
| pending   | ready       | No      |
| completed | pending     | No      |

---
### Requirement: Staff authentication
The system SHALL require staff to authenticate before accessing the order queue.

#### Scenario: Unauthenticated access to orders page
- **WHEN** an unauthenticated user navigates to the orders page
- **THEN** the system SHALL redirect them to the login page