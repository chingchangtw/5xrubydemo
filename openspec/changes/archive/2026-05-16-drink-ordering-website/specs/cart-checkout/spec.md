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

### Requirement: View and edit cart
The system SHALL display all cart items and allow quantity changes or removal before checkout.

#### Scenario: Customer views cart
- **WHEN** a customer opens the cart
- **THEN** all cart items SHALL be listed with drink name, customization summary, unit price, and quantity
- **THEN** the cart subtotal SHALL be displayed as the sum of (unit_price × quantity) for all items

#### Scenario: Customer changes item quantity to zero
- **WHEN** a customer sets an item quantity to 0 or taps the remove button
- **THEN** the item SHALL be removed from the cart

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

### Requirement: Persist cart across page reloads
The system SHALL persist cart contents in browser localStorage so items survive page reloads.

#### Scenario: Customer reloads the page
- **WHEN** a customer reloads the browser tab
- **THEN** all cart items SHALL be restored from localStorage
