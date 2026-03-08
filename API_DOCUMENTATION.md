# API Documentation

Complete API reference for the MERN E-Commerce Application

## Base URL
```
http://localhost:5000/api
```

## Authentication Header
For protected endpoints, include:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 1. Authentication Endpoints

### Register Customer
**POST** `/auth/customer-signup`

Request Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123",
  "mobile": "1234567890",
  "address": "123 Main Street"
}
```

Response (201):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "isAdmin": false
  },
  "customer": {
    "_id": "customer_id",
    "user": "user_id",
    "address": "123 Main Street",
    "mobile": "1234567890"
  }
}
```

---

### Customer Login
**POST** `/auth/customer-login`

Request Body:
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

Response (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... },
  "customer": { ... }
}
```

Error Response (401):
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Admin Login
**POST** `/auth/admin-login`

Request Body:
```json
{
  "username": "admin",
  "password": "admin_password"
}
```

Response (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "isAdmin": true,
    ...
  }
}
```

---

### Get Current User
**GET** `/auth/me` (Protected)

Headers:
```
Authorization: Bearer <TOKEN>
```

Response (200):
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "isAdmin": false
  }
}
```

---

## 2. Product Endpoints

### Get All Products
**GET** `/products`

Query Parameters:
- `limit` (optional): Number of products to return
- `page` (optional): Page number for pagination

Response (200):
```json
{
  "success": true,
  "products": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "price": 99.99,
      "description": "Product description",
      "productImage": "path/to/image.jpg",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Single Product
**GET** `/products/:id`

Response (200):
```json
{
  "success": true,
  "product": {
    "_id": "product_id",
    "name": "Product Name",
    "price": 99.99,
    "description": "Product description",
    "productImage": "path/to/image.jpg"
  }
}
```

---

### Add Product (Admin Only)
**POST** `/products` (Protected - Admin)

Form Data:
```
name: "Product Name"
price: 99.99
description: "Product description"
productImage: (file upload)
```

Response (201):
```json
{
  "success": true,
  "product": {
    "_id": "new_product_id",
    "name": "Product Name",
    "price": 99.99,
    "description": "Product description",
    "productImage": "uploads/product_image/..."
  }
}
```

---

### Update Product (Admin Only)
**PUT** `/products/:id` (Protected - Admin)

Form Data:
```
name: "Updated Name"
price: 129.99
description: "Updated description"
productImage: (file upload - optional)
```

Response (200):
```json
{
  "success": true,
  "product": { ... }
}
```

---

### Delete Product (Admin Only)
**DELETE** `/products/:id` (Protected - Admin)

Response (200):
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 3. Order Endpoints

### Get All Orders (Admin Only)
**GET** `/orders` (Protected - Admin)

Response (200):
```json
{
  "success": true,
  "orders": [
    {
      "_id": "order_id",
      "customer": { ... },
      "product": { ... },
      "email": "customer@email.com",
      "address": "123 Main St",
      "mobile": "1234567890",
      "orderDate": "2024-01-16T14:30:00Z",
      "status": "Pending"
    }
  ]
}
```

---

### Get My Orders (Protected)
**GET** `/orders/my-orders` (Protected)

Response (200):
```json
{
  "success": true,
  "orders": [ ... ]
}
```

---

### Place Order (Protected)
**POST** `/orders` (Protected)

Request Body:
```json
{
  "productId": "product_id",
  "email": "customer@email.com",
  "address": "123 Main Street",
  "mobile": "1234567890"
}
```

Response (201):
```json
{
  "success": true,
  "order": {
    "_id": "order_id",
    "customer": "customer_id",
    "product": "product_id",
    "email": "customer@email.com",
    "address": "123 Main Street",
    "mobile": "1234567890",
    "orderDate": "2024-01-16T14:30:00Z",
    "status": "Pending"
  }
}
```

---

### Update Order Status (Admin Only)
**PUT** `/orders/:id` (Protected - Admin)

Request Body:
```json
{
  "status": "Order Confirmed"
}
```

Valid Status Values:
- `Pending`
- `Order Confirmed`
- `Out for Delivery`
- `Delivered`

Response (200):
```json
{
  "success": true,
  "order": { ... }
}
```

---

### Delete Order (Admin Only)
**DELETE** `/orders/:id` (Protected - Admin)

Response (200):
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

---

## 4. Customer Endpoints

### Get All Customers (Admin Only)
**GET** `/customers/all` (Protected - Admin)

Response (200):
```json
{
  "success": true,
  "customers": [
    {
      "_id": "customer_id",
      "user": {
        "_id": "user_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "address": "123 Main Street",
      "mobile": "1234567890",
      "profilePic": null
    }
  ]
}
```

---

### Get Customer Profile (Protected)
**GET** `/customers/profile` (Protected)

Response (200):
```json
{
  "success": true,
  "customer": {
    "_id": "customer_id",
    "user": { ... },
    "address": "123 Main Street",
    "mobile": "1234567890",
    "profilePic": "uploads/profile_pic/..."
  }
}
```

---

### Update Customer Profile (Protected)
**PUT** `/customers/profile` (Protected)

Form Data:
```
firstName: "John"
lastName: "Doe"
address: "123 Main Street"
mobile: "1234567890"
profilePic: (file upload - optional)
```

Response (200):
```json
{
  "success": true,
  "customer": { ... }
}
```

---

### Delete Customer (Admin Only)
**DELETE** `/customers/:id` (Protected - Admin)

Response (200):
```json
{
  "success": true,
  "message": "Customer deleted successfully"
}
```

---

## 5. Feedback Endpoints

### Get All Feedback
**GET** `/feedback`

Response (200):
```json
{
  "success": true,
  "feedback": [
    {
      "_id": "feedback_id",
      "name": "John Doe",
      "feedback": "Great product!",
      "date": "2024-01-16T14:30:00Z"
    }
  ]
}
```

---

### Submit Feedback
**POST** `/feedback`

Request Body:
```json
{
  "name": "John Doe",
  "feedback": "Great product! Very satisfied with my purchase."
}
```

Response (201):
```json
{
  "success": true,
  "feedback": {
    "_id": "feedback_id",
    "name": "John Doe",
    "feedback": "Great product! Very satisfied with my purchase.",
    "date": "2024-01-16T14:30:00Z"
  }
}
```

---

### Delete Feedback (Admin Only)
**DELETE** `/feedback/:id` (Protected - Admin)

Response (200):
```json
{
  "success": true,
  "message": "Feedback deleted successfully"
}
```

---

## Error Responses

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "User role not authorized to access this route"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### Bad Request (400)
```json
{
  "success": false,
  "message": "Please provide required fields"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## Rate Limiting & Best Practices

1. **Authentication**: Always validate tokens on protected routes
2. **Error Handling**: Always check for `success` field in responses
3. **Pagination**: Use limit and page parameters for large datasets
4. **File Uploads**: Maximum file size is typically 10MB per file
5. **Headers**: Always set `Content-Type: application/json` for JSON requests
6. **CORS**: Frontend and backend must be on different origins

---

## Testing with cURL

### Example: Register a customer
```bash
curl -X POST http://localhost:5000/api/auth/customer-signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123",
    "mobile": "1234567890",
    "address": "123 Main Street"
  }'
```

### Example: Get all products
```bash
curl http://localhost:5000/api/products
```

### Example: Protected route with token
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:5000/api/customers/profile
```

---

## Webhooks & Events (Future)

Planned webhook events:
- Order created
- Order status changed
- Product reviewed
- Feedback submitted
- Payment completed

---

**Last Updated**: January 2024  
**API Version**: 1.0
