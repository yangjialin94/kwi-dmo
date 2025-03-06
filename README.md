# User Flow

## Product Listing & Cart Management

### User Story

- As a user, I want to see a list of products with their images, pricing, and discounts.
- As a user, I want to add products to my cart.
- As a user, I want to see my cart total update in real-time.
- As a user, I want to remove items from my cart.

### Flow

1. User opens the POS system.
2. System fetches product data from the backend.
3. User adds items to the cart.
4. Cart updates and shows.
    - Items added.
    - Price calculation.
    - Discounts applied).
5. User can remove items from the cart.
6. Cart updates the total.

## Checkout & Payment Processing (Mock)

### User Story

- As a user, I want to proceed to checkout and see my selected items with total pricing.
- As a user, I want to confirm the purchase and receive a success message.

### Flow

1. User clicks “Checkout”.
2. System displays a checkout page with:
    - Items in the cart.
    - Discounts applied.
    - Tax calculation.
3. User clicks “Pay”.
4. System sends a mock checkout request to the backend.
5. Backend processes payment (mock) and returns success.
6. User sees “Payment Successful” message.
