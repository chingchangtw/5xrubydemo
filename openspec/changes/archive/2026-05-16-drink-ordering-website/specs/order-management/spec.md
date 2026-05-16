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

### Requirement: Staff authentication
The system SHALL require staff to authenticate before accessing the order queue.

#### Scenario: Unauthenticated access to orders page
- **WHEN** an unauthenticated user navigates to the orders page
- **THEN** the system SHALL redirect them to the login page
