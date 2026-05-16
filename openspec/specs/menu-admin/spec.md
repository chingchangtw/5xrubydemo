## ADDED Requirements

### Requirement: Admin manages categories
The system SHALL allow authenticated admins to create, edit, reorder, and deactivate categories.

#### Scenario: Admin creates a category
- **WHEN** an admin submits a new category with a unique name
- **THEN** the category SHALL be created with active=true and appended at the end of display_order

#### Scenario: Admin deactivates a category
- **WHEN** an admin deactivates a category
- **THEN** the category SHALL have active=false
- **THEN** all drinks in the category SHALL be hidden from the customer menu


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

### Requirement: Admin manages drinks
The system SHALL allow authenticated admins to create, edit, and deactivate drinks within a category.

#### Scenario: Admin creates a drink
- **WHEN** an admin submits a new drink with name, category, and base price
- **THEN** the drink SHALL be created with active=true

#### Scenario: Admin edits a drink
- **WHEN** an admin updates a drink's name, description, price, or image
- **THEN** the updated values SHALL be persisted and reflected immediately on the customer menu

#### Scenario: Admin deactivates a drink
- **WHEN** an admin sets a drink to inactive
- **THEN** the drink SHALL NOT appear on the customer menu
- **THEN** existing orders containing that drink SHALL NOT be affected


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

### Requirement: Admin manages drink options
The system SHALL allow authenticated admins to add, edit, and remove customization options for a drink.

#### Scenario: Admin adds an option to a drink
- **WHEN** an admin adds an option with type, label, and price_delta to a drink
- **THEN** the option SHALL appear in the drink's customization panel on the customer menu

#### Scenario: Admin removes an option
- **WHEN** an admin removes an option from a drink
- **THEN** the option SHALL no longer be available for new orders
- **THEN** existing order_items referencing the removed option SHALL NOT be modified


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

### Requirement: Admin authentication
The system SHALL require admin role authentication before accessing the admin panel.

#### Scenario: Staff role cannot access admin panel
- **WHEN** a user authenticated with the staff role navigates to the admin panel
- **THEN** the system SHALL return a 403 Forbidden response

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

### Requirement: Admin manages categories
The system SHALL allow authenticated admins to create, edit, reorder, and deactivate categories.

#### Scenario: Admin creates a category
- **WHEN** an admin submits a new category with a unique name
- **THEN** the category SHALL be created with active=true and appended at the end of display_order

#### Scenario: Admin deactivates a category
- **WHEN** an admin deactivates a category
- **THEN** the category SHALL have active=false
- **THEN** all drinks in the category SHALL be hidden from the customer menu

---
### Requirement: Admin manages drinks
The system SHALL allow authenticated admins to create, edit, and deactivate drinks within a category.

#### Scenario: Admin creates a drink
- **WHEN** an admin submits a new drink with name, category, and base price
- **THEN** the drink SHALL be created with active=true

#### Scenario: Admin edits a drink
- **WHEN** an admin updates a drink's name, description, price, or image
- **THEN** the updated values SHALL be persisted and reflected immediately on the customer menu

#### Scenario: Admin deactivates a drink
- **WHEN** an admin sets a drink to inactive
- **THEN** the drink SHALL NOT appear on the customer menu
- **THEN** existing orders containing that drink SHALL NOT be affected

---
### Requirement: Admin manages drink options
The system SHALL allow authenticated admins to add, edit, and remove customization options for a drink.

#### Scenario: Admin adds an option to a drink
- **WHEN** an admin adds an option with type, label, and price_delta to a drink
- **THEN** the option SHALL appear in the drink's customization panel on the customer menu

#### Scenario: Admin removes an option
- **WHEN** an admin removes an option from a drink
- **THEN** the option SHALL no longer be available for new orders
- **THEN** existing order_items referencing the removed option SHALL NOT be modified

---
### Requirement: Admin authentication
The system SHALL require admin role authentication before accessing the admin panel.

#### Scenario: Staff role cannot access admin panel
- **WHEN** a user authenticated with the staff role navigates to the admin panel
- **THEN** the system SHALL return a 403 Forbidden response