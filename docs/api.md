# Vendorspot Digital Products API Documentation

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://your-backend-app.onrender.com/api`

## Tech Stack

- **Backend**: Node.js with Express.js and TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with refresh tokens
- **Email Service**: Resend (with fallback for development)
- **File Storage**: Cloudinary
- **Payment Processing**: Paystack
- **Logging**: Winston
- **Deployment**: Render

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Authentication Middleware

- `authenticate` - Verify JWT token and get user
- `authorize(...roles)` - Check user roles
- `isVendor` - Ensure user is vendor or admin
- `isAdmin` - Ensure user is admin
- `optionalAuth` - Optional authentication (doesn't throw error)

## API Endpoints

### Authentication (`/api/auth`)

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2348012345678",
  "isVendor": false
}
```

**Response:**

```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "_id": "user-id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER",
      "status": "ACTIVE",
      "isEmailVerified": false,
      "isPhoneVerified": false,
      "country": "Nigeria",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user-id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER",
      "status": "ACTIVE",
      "isEmailVerified": false,
      "isPhoneVerified": false,
      "country": "Nigeria",
      "lastLoginAt": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

#### Refresh Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "token": "new-jwt-access-token",
    "refreshToken": "new-jwt-refresh-token"
  }
}
```

#### Logout User

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

#### Forgot Password

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "If an account with that email exists, a password reset link has been sent"
}
```

#### Reset Password

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "newpassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password reset successful"
}
```

#### Verify Email

```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "verification-token-from-email"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

#### Resend Verification Email

```http
POST /api/auth/resend-verification
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Verification email sent successfully"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "_id": "user-id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER",
    "status": "ACTIVE",
    "isEmailVerified": true,
    "isPhoneVerified": false,
    "country": "Nigeria",
    "lastLoginAt": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Users (`/api/users`)

#### Get User Profile

```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update User Profile

```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2348012345678",
  "address": "123 Main St",
  "city": "Lagos",
  "state": "Lagos"
}
```

### Products (`/api/products`)

#### Get All Products

```http
GET /api/products?page=1&limit=10&category=web-templates&search=wordpress
```

Query Parameters:

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (string): Filter by category slug
- `search` (string): Search in product name and description
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `sortBy` (string): Sort by field (createdAt, price, rating)
- `sortOrder` (string): Sort order (asc, desc)
- `isFeatured` (boolean): Filter featured products

#### Get Product by ID

```http
GET /api/products/:id
```

#### Get Vendor Products

```http
GET /api/products/vendor?page=1&limit=10
Authorization: Bearer <token>
```

#### Create Product (Vendor Only)

```http
POST /api/products
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Premium WordPress Theme",
  "description": "A modern, responsive WordPress theme",
  "price": 29.99,
  "categoryId": "category-id",
  "tags": ["wordpress", "theme", "responsive"],
  "file": [File],
  "thumbnail": [File],
  "images": [File, File]
}
```

#### Update Product (Vendor Only)

```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 39.99
}
```

#### Delete Product (Vendor Only)

```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Categories (`/api/categories`)

#### Get All Categories

```http
GET /api/categories
```

#### Get Category by ID

```http
GET /api/categories/:id
```

#### Create Category (Admin Only)

```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Web Templates",
  "slug": "web-templates",
  "description": "Professional web templates",
  "parentId": "parent-category-id"
}
```

### Admin (`/api/admin`)

#### Admin Dashboard

```http
GET /api/admin/dashboard
Authorization: Bearer <token>
```

## Response Formats

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [
    // Array of items
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "stack": "Error stack (development only)"
}
```

## Error Codes

- `400` - Bad Request (Validation errors, invalid data)
- `401` - Unauthorized (Invalid or missing token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource not found)
- `409` - Conflict (Duplicate data)
- `429` - Too Many Requests (Rate limit exceeded)
- `500` - Internal Server Error

## Email Service

The API uses Resend for email delivery with the following templates:

- **Welcome Email** - Sent after user registration
- **Email Verification** - Sent for email verification
- **Password Reset** - Sent for password reset requests
- **Order Confirmation** - Sent after successful purchase

### Email Configuration

Set `RESEND_API_KEY` in environment variables to enable email service. If not set, emails will be logged for development purposes.

## File Upload

Files are uploaded to Cloudinary. Set `CLOUDINARY_URL` in environment variables.

Supported file types:

- Images: jpg, jpeg, png, gif
- Documents: pdf, doc, docx
- Archives: zip, rar
- Media: mp4, mp3, wav

Maximum file size: 10MB (configurable via `MAX_FILE_SIZE`)

## Rate Limiting

- **Global Rate Limit**: 100 requests per 15 minutes per IP
- Applied to all `/api/*` routes
- Returns 429 status code when exceeded

## Logging

The API uses Winston for logging with the following levels:

- `error` - Error messages
- `warn` - Warning messages
- `info` - General information
- `debug` - Debug information

Logs are written to:

- `logs/error.log` - Error logs only
- `logs/combined.log` - All logs
- Console (development only)

## Environment Variables

See `backend/.env.example` for all required environment variables.

## Database Models

### User Model

- Authentication and profile information
- Roles: CUSTOMER, VENDOR, ADMIN, MODERATOR
- Status: ACTIVE, INACTIVE, SUSPENDED, BANNED

### Product Model

- Digital product information
- Vendor association
- Category association
- Pricing and licensing
- Approval workflow

### Category Model

- Product categorization
- Hierarchical structure support
- Active/inactive status

### Vendor Model

- Business information
- Verification status
- Performance metrics
- Bank account details
