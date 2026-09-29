GYANGMI EATS - CHECKOUT FIX

This package keeps the existing Gyangmi Eats project and replaces only:
frontend/checkout.html

The checkout fix:
- Resolves restaurant_id from the current Menus table instead of trusting stale cart data.
- Supports a cart containing items from multiple restaurants by creating one order per restaurant.
- Uses the current /orders response format (id/order_id).
- Saves order items and payments for each created order.
- Clears the cart only after all required operations succeed.
- Keeps the existing Gyangmi Eats checkout design.

IMPORTANT:
- The real .env file is NOT included for security.
- Copy .env.example to .env and put your own local MySQL password there.
- Do not upload .env publicly.

Run:
1. cd "Gyangmi Eats"
2. npm install
3. node index.js
4. Open http://localhost:3000/checkout.html

Use the existing database gyangmi_eats.


FINAL FIX: /addresses now uses the actual local schema: user_id, address, city, postal_code, phone.
