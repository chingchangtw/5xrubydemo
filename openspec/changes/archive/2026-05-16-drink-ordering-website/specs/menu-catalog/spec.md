## ADDED Requirements

### Requirement: Browse drink categories
The system SHALL display all active drink categories in a navigable list on the menu page.

#### Scenario: Categories load on menu page
- **WHEN** a customer navigates to the menu page
- **THEN** all active categories SHALL be displayed in ascending display_order
- **THEN** inactive categories SHALL NOT appear

### Requirement: Browse drinks by category
The system SHALL display all active drinks belonging to a selected category.

#### Scenario: Customer selects a category
- **WHEN** a customer selects a category
- **THEN** only active drinks in that category SHALL be shown
- **THEN** each drink SHALL display name, description, base price, and image

#### Scenario: Category has no active drinks
- **WHEN** a customer selects a category with no active drinks
- **THEN** the system SHALL display an empty state message

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

### Requirement: Default customization selection
The system SHALL pre-select a default option for each option group when displaying a drink.

#### Scenario: First option is default
- **WHEN** a customer opens a drink detail view
- **THEN** the first option in each group SHALL be pre-selected
