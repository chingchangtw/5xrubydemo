## ADDED Requirements

### Requirement: Browse drink categories
The system SHALL display all active drink categories in a navigable list on the menu page.

#### Scenario: Categories load on menu page
- **WHEN** a customer navigates to the menu page
- **THEN** all active categories SHALL be displayed in ascending display_order
- **THEN** inactive categories SHALL NOT appear


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

### Requirement: Browse drinks by category
The system SHALL display all active drinks belonging to a selected category.

#### Scenario: Customer selects a category
- **WHEN** a customer selects a category
- **THEN** only active drinks in that category SHALL be shown
- **THEN** each drink SHALL display name, description, base price, and image

#### Scenario: Category has no active drinks
- **WHEN** a customer selects a category with no active drinks
- **THEN** the system SHALL display an empty state message


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

### Requirement: View drink customization options
The system SHALL display all available options for a drink when the customer views its detail.

#### Scenario: Drink has customization options
- **WHEN** a customer opens a drink detail view
- **THEN** all option groups (size, sugar level, ice level, toppings) SHALL be shown
- **THEN** each option SHALL display its label and any price delta
- **THEN** options with a positive price delta SHALL display as "+$X.XX"

##### Example: price delta display
| Option type | Price delta | Display |
|-------------|-------------|---------|
| Large size  | +15         | +$15    |
| No sugar    | 0           | (no delta shown) |
| Extra topping | +10       | +$10    |


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

### Requirement: Default customization selection
The system SHALL pre-select a default option for each option group when displaying a drink.

#### Scenario: First option is default
- **WHEN** a customer opens a drink detail view
- **THEN** the first option in each group SHALL be pre-selected

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

### Requirement: Browse drink categories
The system SHALL display all active drink categories in a navigable list on the menu page.

#### Scenario: Categories load on menu page
- **WHEN** a customer navigates to the menu page
- **THEN** all active categories SHALL be displayed in ascending display_order
- **THEN** inactive categories SHALL NOT appear

---
### Requirement: Browse drinks by category
The system SHALL display all active drinks belonging to a selected category.

#### Scenario: Customer selects a category
- **WHEN** a customer selects a category
- **THEN** only active drinks in that category SHALL be shown
- **THEN** each drink SHALL display name, description, base price, and image

#### Scenario: Category has no active drinks
- **WHEN** a customer selects a category with no active drinks
- **THEN** the system SHALL display an empty state message

---
### Requirement: View drink customization options
The system SHALL display all available options for a drink when the customer views its detail.

#### Scenario: Drink has customization options
- **WHEN** a customer opens a drink detail view
- **THEN** all option groups (size, sugar level, ice level, toppings) SHALL be shown
- **THEN** each option SHALL display its label and any price delta
- **THEN** options with a positive price delta SHALL display as "+$X.XX"

##### Example: price delta display
| Option type | Price delta | Display |
|-------------|-------------|---------|
| Large size  | +15         | +$15    |
| No sugar    | 0           | (no delta shown) |
| Extra topping | +10       | +$10    |

---
### Requirement: Default customization selection
The system SHALL pre-select a default option for each option group when displaying a drink.

#### Scenario: First option is default
- **WHEN** a customer opens a drink detail view
- **THEN** the first option in each group SHALL be pre-selected