# E-Commerce and Inventory Management System

## 1. Cover Page and Team Details
**Project Title:** E-Commerce and Inventory Management System  
**Subject:** Backend Development  
**Technology Stack:** Node.js, Express.js, MongoDB, Mongoose, Socket.IO  
**Student Name:** ____________________  
**Roll Number:** ____________________  
**Class/Section:** ____________________  
**Submission Date:** ____________________

## 2. Abstract / Executive Summary
The E-Commerce and Inventory Management System is a backend application designed to manage products, categories, shopping carts, customer orders and stock levels. It provides REST APIs using Node.js and Express.js, stores application data in MongoDB through Mongoose, and uses JWT authentication with role-based authorization. The system also provides sales and inventory analytics and real-time notifications for order and stock events. Payment is simulated for academic demonstration.

## 3. Problem Statement
Manual product and stock tracking can lead to inaccurate inventory, duplicate records and delayed order updates. The proposed system centralizes product management, cart operations, order processing and inventory updates through a secure backend API.

## 4. Project Objectives
- Develop RESTful APIs using Node.js and Express.js.
- Store and validate data using MongoDB and Mongoose.
- Provide customer, seller and administrator roles.
- Secure accounts using bcrypt and JWT access/refresh tokens.
- Manage products, categories, carts, orders and stock.
- Generate sales and inventory summaries using aggregation.
- Demonstrate EventEmitter and Socket.IO notifications.

## 5. Scope and Limitations
The system covers customer registration, product browsing, seller product management, cart operations, checkout, order status updates, stock control and reports. Payment is simulated; the application does not process real payments. A full frontend, shipping-provider integration and production-grade payment gateway are outside the current scope.

## 6. Functional and Non-Functional Requirements
**Functional:** authentication, role permissions, product/category CRUD, cart, checkout, order history/status, stock adjustment, low-stock reporting and sales/inventory analytics.  
**Non-functional:** maintainable MVC-style structure, input validation, secure password storage, consistent JSON responses, centralized errors, pagination, logging and API rate limiting.

## 7. System Architecture and Modules
The application follows a layered MVC-style structure. Routes define endpoints, middleware checks authentication and roles, controllers implement business logic, models define MongoDB schemas, and services provide event and socket functionality.

## 8. Database Design
Collections: Users, Categories, Products, Carts and Orders. User roles are customer, seller and admin. Products reference a category and seller. Carts reference products and quantities. Orders store product name, unit-price and quantity snapshots to preserve order details. See `docs/DATABASE_DESIGN.md` for relationships and indexes.

## 9. REST API Documentation
The API is organized under `/api/auth`, `/api/products`, `/api/categories`, `/api/cart`, `/api/orders` and `/api/reports`. Detailed methods, routes, access roles and payload notes are provided in `docs/API_DOCUMENTATION.md`.

## 10. Authentication and Authorization Design
Passwords are hashed with bcryptjs before storage. Login issues a short-lived JWT access token and a refresh token. The refresh token is stored as a SHA-256 hash and rotated when refreshed. Protected routes verify the access token. Role middleware restricts seller and administrator functions.

## 11. Implementation Details
The server is created with Express and an HTTP server. Mongoose connects to MongoDB. Product APIs support filtering and pagination. Checkout recalculates totals from database prices and decrements stock conditionally within a MongoDB transaction. Cancellation restores stock. EventEmitter publishes `order-placed` and `stock-low` events; Socket.IO sends order updates and low-stock alerts.

## 12. Testing Strategy and Test Cases
Testing includes successful registration/login, duplicate email, invalid login, missing token, insufficient role, invalid stock changes, empty cart checkout, valid checkout and report endpoints. Import `postman/Capstone_API.postman_collection.json` and follow `docs/TEST_CASES.md`. Actual test results should be recorded after running the application in the target environment.

## 13. Screenshots / Demonstration Evidence
Insert screenshots from your own run: (1) server running and `/api/health`, (2) successful login, (3) product list, (4) cart and checkout, (5) order status, and (6) report endpoints. Do not submit placeholder screenshots as real execution evidence.

## 14. Conclusion and Future Enhancements
The project demonstrates a backend workflow for e-commerce and inventory management with REST APIs, database modelling, authentication, authorization, validation, aggregation and real-time events. Future enhancements include a frontend dashboard, payment gateway integration, invoice generation, product reviews, coupons and production-grade socket authentication.

## 15. References
- Node.js documentation: https://nodejs.org/docs/
- Express documentation: https://expressjs.com/
- MongoDB documentation: https://www.mongodb.com/docs/
- Mongoose documentation: https://mongoosejs.com/docs/
- Socket.IO documentation: https://socket.io/docs/v4/
