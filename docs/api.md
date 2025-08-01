# Vendorspot Digital Products API Documentation

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://api.digital.vendorspot.com`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (vendor only)
- `PUT /products/:id` - Update product (vendor only)
- `DELETE /products/:id` - Delete product (vendor only)

### Orders

- `GET /orders` - Get user orders
- `POST /orders` - Create new order
- `GET /orders/:id` - Get order details
- `PUT /orders/:id/cancel` - Cancel order

### Payments

- `POST /payments/initialize` - Initialize payment
- `POST /payments/verify` - Verify payment
- `GET /payments/:id` - Get payment details

### Users

- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `POST /users/avatar` - Upload avatar

### Vendors

- `POST /vendors/register` - Register as vendor
- `GET /vendors/:id` - Get vendor details
- `PUT /vendors/profile` - Update vendor profile

## Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

## Error Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```
