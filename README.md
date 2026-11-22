# E-Commerce and Inventory Management System

Backend Development Capstone Project using **Node.js, Express.js, MongoDB, Mongoose and Socket.IO**.

## Features
- Customer, seller and admin roles with role-based access control.
- Registration/login, bcrypt password hashing, JWT access tokens and rotating refresh tokens.
- Product and category CRUD; product search, filtering, sorting by newest and pagination.
- Customer cart and checkout; server-calculated totals and stock validation.
- MongoDB transaction for checkout stock deduction; stock restoration on order cancellation.
- Sales, inventory and low-stock reports; multiple aggregation pipelines.
- Mongoose validation and indexes; centralized error handling, Helmet, CORS, request logging and rate limiting.
- EventEmitter events (`order-placed`, `stock-low`) and Socket.IO notifications (`order-status`, `low-stock-alert`).

## Requirements
Node.js 18+, npm and MongoDB (local MongoDB or MongoDB Atlas).

## Setup
1. Extract the ZIP and open the project folder in VS Code / terminal.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `MONGO_URI` and replace both JWT secrets with long random values.
5. Run `npm run seed` to create demo data.
6. Run `npm start`. Server starts at `http://localhost:5000`.
7. Test `GET http://localhost:5000/api/health`.

## Demo accounts
- Admin: `admin@example.com` / `Admin@123`
- Seller: `seller@example.com` / `Seller@123`

Change these credentials and secrets before any public deployment. Seed script is intended for local academic demonstration only.

## Typical workflow
1. Login as seller and create/list products (use seeded category ID from MongoDB or create a category as admin).
2. Register/login as customer.
3. Add product to cart using `POST /api/cart/items`.
4. Checkout using `POST /api/orders` with a delivery address. Payment is **simulated only**; no real payment gateway or card data is used.
5. Login as seller/admin and view orders or update status.
6. View sales/inventory/low-stock reports.

## Environment variables
See `.env.example`. Never commit `.env` or real secrets.

## Documentation
- `docs/DATABASE_DESIGN.md` – collections, relationships and indexes.
- `docs/API_DOCUMENTATION.md` – endpoints, roles and Socket.IO events.
- `docs/TEST_CASES.md` – positive, negative and authorization tests.
- `postman/Capstone_API.postman_collection.json` – import into Postman.
- `PROJECT_REPORT.md` – project report draft.

## Architecture
Request → Route → Authentication/Authorization Middleware → Controller → Mongoose Model → MongoDB → JSON Response. Business events are emitted through a shared EventEmitter and delivered to connected clients using Socket.IO.

## Important implementation notes
- Checkout uses MongoDB transactions; use a replica-set deployment (MongoDB Atlas supports this) for transaction support. A standalone local MongoDB server may reject transactions unless configured as a replica set.
- Socket room joining is a simple academic demonstration; production deployments must verify JWTs during the socket handshake.
- Run `npm test` for the included basic automated tests. Full endpoint validation should also be demonstrated using Postman.
