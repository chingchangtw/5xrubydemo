## ADDED Requirements

### Requirement: Add drink to cart
The system SHALL allow a customer to add a drink with selected customizations to the cart.

#### Scenario: Customer adds a drink
- **WHEN** a customer selects customizations and taps "Add to Cart"
- **THEN** the drink SHALL be added to the cart with the selected options and calculated price
- **THEN** the cart item count badge SHALL update immediately

#### Scenario: Customer adds the same drink twice with different customizations
- **WHEN** a customer adds the same drink with different customization selections
- **THEN** each combination SHALL be stored as a separate cart line item


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

### Requirement: View and edit cart
The system SHALL display all cart items and allow quantity changes or removal before checkout.

#### Scenario: Customer views cart
- **WHEN** a customer opens the cart
- **THEN** all cart items SHALL be listed with drink name, customization summary, unit price, and quantity
- **THEN** the cart subtotal SHALL be displayed as the sum of (unit_price × quantity) for all items

#### Scenario: Customer changes item quantity to zero
- **WHEN** a customer sets an item quantity to 0 or taps the remove button
- **THEN** the item SHALL be removed from the cart


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

### Requirement: Submit order
The system SHALL allow a customer to submit the cart as an order.

#### Scenario: Successful order submission
- **WHEN** a customer taps "Place Order" with a non-empty cart
- **THEN** the system SHALL create an order with status `pending`
- **THEN** the cart SHALL be cleared
- **THEN** the customer SHALL be shown an order confirmation with order ID

#### Scenario: Empty cart submission attempt
- **WHEN** a customer attempts to place an order with an empty cart
- **THEN** the system SHALL display an error and SHALL NOT create an order


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

### Requirement: Persist cart across page reloads
The system SHALL persist cart contents in browser localStorage so items survive page reloads.

#### Scenario: Customer reloads the page
- **WHEN** a customer reloads the browser tab
- **THEN** all cart items SHALL be restored from localStorage

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

### Requirement: Add drink to cart
The system SHALL allow a customer to add a drink with selected customizations to the cart.

#### Scenario: Customer adds a drink
- **WHEN** a customer selects customizations and taps "Add to Cart"
- **THEN** the drink SHALL be added to the cart with the selected options and calculated price
- **THEN** the cart item count badge SHALL update immediately

#### Scenario: Customer adds the same drink twice with different customizations
- **WHEN** a customer adds the same drink with different customization selections
- **THEN** each combination SHALL be stored as a separate cart line item

---
### Requirement: View and edit cart
The system SHALL display all cart items and allow quantity changes or removal before checkout.

#### Scenario: Customer views cart
- **WHEN** a customer opens the cart
- **THEN** all cart items SHALL be listed with drink name, customization summary, unit price, and quantity
- **THEN** the cart subtotal SHALL be displayed as the sum of (unit_price × quantity) for all items

#### Scenario: Customer changes item quantity to zero
- **WHEN** a customer sets an item quantity to 0 or taps the remove button
- **THEN** the item SHALL be removed from the cart

---
### Requirement: Submit order
The system SHALL allow a customer to submit the cart as an order.

#### Scenario: Successful order submission
- **WHEN** a customer taps "Place Order" with a non-empty cart
- **THEN** the system SHALL create an order with status `pending`
- **THEN** the cart SHALL be cleared
- **THEN** the customer SHALL be shown an order confirmation with order ID

#### Scenario: Empty cart submission attempt
- **WHEN** a customer attempts to place an order with an empty cart
- **THEN** the system SHALL display an error and SHALL NOT create an order

---
### Requirement: Persist cart across page reloads
The system SHALL persist cart contents in browser localStorage so items survive page reloads.

#### Scenario: Customer reloads the page
- **WHEN** a customer reloads the browser tab
- **THEN** all cart items SHALL be restored from localStorage