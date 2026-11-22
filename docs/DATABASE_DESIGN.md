# Database Design

- **User**: name, unique email, bcrypt password hash, role (customer/seller/admin), refresh-token hash and active flag.
- **Category**: unique category name and description.
- **Product**: name, description, price, category reference, seller reference, stock, low-stock threshold and active flag.
- **Cart**: one cart per customer; product references and quantities.
- **Order**: customer reference, immutable item name/price/quantity snapshots, total, delivery address, simulated payment status and order status.

Relationships: one seller owns many products; one category contains many products; one customer has one cart and many orders. Mongoose references (`ObjectId`) implement relationships.

Indexes: unique User.email, unique Category.name, Product text index on name/description, Product compound indexes on category+price and seller+createdAt, Cart unique user, Order user+createdAt and status+createdAt.
