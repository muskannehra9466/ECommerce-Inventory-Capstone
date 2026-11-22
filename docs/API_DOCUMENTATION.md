# REST API Documentation
Base URL: `http://localhost:5000/api`

| Method | Endpoint | Auth / Role | Purpose |
|---|---|---|---|
| GET | /health | Public | API health |
| POST | /auth/register | Public | Customer registration |
| POST | /auth/login | Public | Login; returns access + refresh token |
| POST | /auth/refresh | Public | Rotate refresh token |
| POST | /auth/logout | Authenticated | Revoke refresh token |
| GET | /auth/me | Authenticated | Current profile |
| GET | /products | Public | List/search/filter/paginate products |
| GET | /products/:id | Public | Product details |
| POST | /products | Seller/Admin | Create product |
| PATCH | /products/:id | Owner Seller/Admin | Update product |
| DELETE | /products/:id | Owner Seller/Admin | Archive product |
| PATCH | /products/:id/stock | Owner Seller/Admin | Adjust stock with validation |
| GET | /categories | Public | List categories |
| POST/PATCH/DELETE | /categories[/:id] | Admin | Category CRUD |
| GET | /cart | Customer | View cart |
| POST | /cart/items | Customer | Add product (`productId`, `quantity`) |
| DELETE | /cart/items/:productId | Customer | Remove item |
| POST | /orders | Customer | Checkout (`deliveryAddress`, optional `paymentMethod`) |
| GET | /orders/my | Customer | Own order history |
| GET | /orders | Seller/Admin | View orders |
| PATCH | /orders/:id/status | Seller/Admin | Update order status |
| GET | /reports/sales | Seller/Admin | Sales aggregation |
| GET | /reports/inventory | Seller/Admin | Inventory aggregation |
| GET | /reports/low-stock | Seller/Admin | Low-stock products |

Protected requests use `Authorization: Bearer <accessToken>`. JSON responses use `{ success, data/message }`. Common status codes: 200 success, 201 created, 400 validation/business rule, 401 unauthenticated, 403 forbidden, 404 missing resource, 409 duplicate, 500 server error.

## Socket.IO events
Connect to the same server. Client emits `join-user-room` with its user ID after authentication in the demo. Server emits `order-status` to `user:<id>` and broadcasts `low-stock-alert`. For production, socket room membership must be derived from a verified JWT rather than trusting a client-supplied user ID.
