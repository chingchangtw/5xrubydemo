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

### Requirement: Admin manages drink options
The system SHALL allow authenticated admins to add, edit, and remove customization options for a drink.

#### Scenario: Admin adds an option to a drink
- **WHEN** an admin adds an option with type, label, and price_delta to a drink
- **THEN** the option SHALL appear in the drink's customization panel on the customer menu

#### Scenario: Admin removes an option
- **WHEN** an admin removes an option from a drink
- **THEN** the option SHALL no longer be available for new orders
- **THEN** existing order_items referencing the removed option SHALL NOT be modified

### Requirement: Admin authentication
The system SHALL require admin role authentication before accessing the admin panel.

#### Scenario: Staff role cannot access admin panel
- **WHEN** a user authenticated with the staff role navigates to the admin panel
- **THEN** the system SHALL return a 403 Forbidden response
