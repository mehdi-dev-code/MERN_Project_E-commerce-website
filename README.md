# MERN Stack Project E-Commerce-Website 

This is an e-commerce project to a modern **MERN Stack (MongoDB, Express, React, Node.js)** with JWT-based authentication.

## Project Structure

```
EcommerceSite-MERN/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/             # Business logic for each entity
│   ├── middleware/              # Authentication & authorization
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # API endpoints
│   ├── uploads/                 # File storage
│   ├── package.json             # Backend dependencies
│   ├── server.js                # Main server file
│   └── .env.example             # Environment variables template
│
└── frontend/
    ├── public/
    │   └── index.html          # HTML entry point
    ├── src/
    │   ├── components/         # Reusable components (Navbar, Footer)
    │   ├── pages/              # Page components
    │   ├── services/           # API calls
    │   ├── styles/             # CSS files
    │   ├── App.js              # Main app component
    │   ├── index.js            # React entry point
    │   ├── index.css           # Global styles
    │   └── package.json        # Frontend dependencies
```

## Key Conversions from Django

### 1. Database Layer
- **Mongoose ODM**
- **Mongoose Schemas**
- Models included: User, Customer, Product, Order, Feedback

### 2. Backend API
- **Express Controllers**
- **Express Routes**
- **Express Middleware**
- **JWT (JSON Web Tokens)**

### 3. Frontend
- **React Components**
- **React Controlled Components**
- **Client-side Rendering with React Router**

### 4. Authentication
- **JWT tokens**
- Tokens stored in browser's localStorage
- Used for API request headers: `Authorization: Bearer <token>`

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Copy environment file
copy .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# Example:
# MONGODB_URI=mongodb://localhost:27017/ecommerce
# JWT_SECRET=your_super_secret_key_here
# PORT=5000

# Install dependencies
npm install

# Start the server
npm start
# For development with auto-reload:
npm run dev
```

Backend will be available at: `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

Frontend will be available at: `http://localhost:3000`

## API Endpoints

### Authentication Routes
```
POST   /api/auth/customer-signup     - Register new customer
POST   /api/auth/customer-login      - Customer login
POST   /api/auth/admin-login         - Admin login
GET    /api/auth/me (Protected)      - Get current user
```

### Product Routes
```
GET    /api/products                 - Get all products
GET    /api/products/:id             - Get single product
POST   /api/products (Admin)         - Add new product
PUT    /api/products/:id (Admin)     - Update product
DELETE /api/products/:id (Admin)     - Delete product
```

### Order Routes
```
GET    /api/orders (Admin)           - Get all orders
GET    /api/orders/my-orders         - Get my orders
POST   /api/orders                   - Place order
PUT    /api/orders/:id (Admin)       - Update order status
DELETE /api/orders/:id (Admin)       - Delete order
```

### Customer Routes
```
GET    /api/customers/all (Admin)    - Get all customers
GET    /api/customers/profile        - Get customer profile
PUT    /api/customers/profile        - Update customer profile
DELETE /api/customers/:id (Admin)    - Delete customer
```

### Feedback Routes
```
GET    /api/feedback                 - Get all feedback
POST   /api/feedback                 - Submit feedback
DELETE /api/feedback/:id (Admin)     - Delete feedback
```

## Features Included

✅ **Customer Management**
- User registration and login
- Customer profiles with profile pictures
- Address and mobile number management

✅ **Product Management**
- Display products with images
- Add/Edit/Delete products (Admin only)
- Product descriptions and pricing

✅ **Order Management**
- Place orders
- Track order status
- Admin order management

✅ **Shopping Cart**
- Add items to cart (localStorage)
- Remove items
- Calculate total

✅ **User Authentication**
- JWT-based authentication
- Role-based access (Admin/Customer)
- Protected routes

✅ **Feedback System**
- Submit feedback/contact forms
- View feedback (Admin)
- Delete feedback

✅ **Admin Dashboard**
- View customers
- Manage products
- Track orders
- View feedback

## File Uploads

File uploads are handled via **Multer**:
- **Product images**: `uploads/product_image/`
- **Profile pictures**: `uploads/profile_pic/CustomerProfilePic/`

## Security Features

1. **Password Hashing**: Bcrypt for secure password storage
2. **JWT Authentication**: Secure API authentication
3. **CORS**: Cross-Origin Resource Sharing enabled
4. **Input Validation**: Express-validator for request validation

## Technology Stack

### Backend
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **Bcryptjs** - Password hashing
- **JWT** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email sending
- **CORS** - Cross-origin requests

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Configuration Files

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:3000
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

## Creating Admin Account

1. Start the application
2. Use the customer signup endpoint to create a user
3. Manually update the user in MongoDB:
   ```javascript
   db.users.updateOne(
     { _id: ObjectId("user_id") },
     { $set: { isAdmin: true } }
   )
   ```

## API Usage Examples

### Customer Signup
```bash
curl -X POST http://localhost:5000/api/auth/customer-signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Anee",
    "lastName": "Ali",
    "email": "anee@example.com",
    "username": "Anee",
    "password": "password123",
    "mobile": "1234567890",
    "address": "123 Main St"
  }'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Place Order (Protected)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product_id",
    "email": "customer@email.com",
    "address": "123 Main St",
    "mobile": "1234567890"
  }'
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or Atlas connection string is correct
- Check firewall/network settings
- Verify connection string in .env file

### CORS Errors
- Ensure frontend URL is correct in backend .env
- Check if backend server is running

### File Upload Issues
- Ensure `uploads/` directory exists with proper permissions
- Check Multer configuration in routes

## Future Enhancements

- [ ] Payment gateway integration (Stripe, Razorpay)
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] User activity logging
- [ ] Admin analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Inventory management
- [ ] Multi-language support

## License

MIT License - feel free to use this project for commercial or personal purposes.

## Author

Developed by **Mehdi Ali**

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Happy coding!** 🚀
