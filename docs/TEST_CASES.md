# API Test Cases

| Case | Request | Expected result |
|---|---|---|
| Health check | GET /api/health | 200 and API status |
| Register valid customer | POST /api/auth/register with name/email/password | 201 and tokens |
| Duplicate registration | Register same email again | 409 |
| Invalid login | POST /api/auth/login with wrong password | 401 |
| Protected endpoint without token | GET /api/auth/me | 401 |
| Customer creates product | POST /api/products as customer | 403 |
| Public product list | GET /api/products | 200 and pagination |
| Invalid stock reduction | PATCH /api/products/:id/stock with change below available stock | 400 |
| Empty cart checkout | POST /api/orders | 400 |
| Valid checkout | Add available item then POST /api/orders | 201; stock decreases |
| Unauthorized category create | POST /api/categories as seller | 403 |
| Reports | GET /api/reports/sales with seller/admin token | 200 aggregation result |

Run requests in Postman using the included collection. Test with a local MongoDB database and the seeded demo users.
