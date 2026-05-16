## Why

Users currently have no digital way to browse a menu and place drink orders. A web-based ordering platform lets customers self-serve — reducing wait staff overhead and enabling upsell through a rich menu experience.

## What Changes

- New web application for browsing a categorized drink menu
- Customers can add items to a cart, customize each order (size, sugar level, ice level, toppings), and submit orders
- Staff view for managing incoming orders and updating order status
- Admin panel for managing the menu (add/edit/remove drinks, categories, pricing)

## Non-Goals

- Payment processing (cash or third-party POS integration is out of scope for v1)
- Mobile native app (web-responsive only)
- Multi-location / franchise support
- Loyalty points or promotions system

## Capabilities

### New Capabilities

- `menu-catalog`: Browse drinks organized by category; each item shows name, description, price, and customization options
- `cart-checkout`: Add drinks to cart with customization (size, sugar, ice, toppings), review order, and submit
- `order-management`: Staff view to see incoming orders, update status (pending → preparing → ready → completed)
- `menu-admin`: Admin CRUD for categories, drinks, pricing, and availability toggles

### Modified Capabilities

(none)

## Impact

- Affected specs: menu-catalog, cart-checkout, order-management, menu-admin
- Affected code:
  - New: src/frontend/app/(routes)/menu, src/frontend/app/(routes)/cart, src/frontend/app/(routes)/orders, src/frontend/app/(routes)/admin
  - New: src/frontend/components/menu, src/frontend/components/cart, src/frontend/components/order
  - New: src/backend/app/routes/menu.py, src/backend/app/routes/orders.py, src/backend/app/routes/admin.py
  - New: src/backend/app/services/menu_service.py, src/backend/app/services/order_service.py
  - New: src/backend/app/models/menu.py, src/backend/app/models/order.py
