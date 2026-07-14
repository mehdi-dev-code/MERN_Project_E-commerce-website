# ShopWave — MERN Stack E-Commerce Website

A full-stack e-commerce application built with the **MERN Stack (MongoDB, Express, React, Node.js)** featuring JWT-based authentication, role-based access control, Cloudinary image storage, and a complete admin dashboard.

🔴 **Live Demo:** [shopwave-frontend-jade.vercel.app](https://shopwave-frontend-jade.vercel.app)
🔧 **Backend API:** [mern-project-e-commerce-website.vercel.app/api](https://mern-project-e-commerce-website.vercel.app/api)

---

## Tech Stack

### Backend
- **Express.js** — Web framework
- **Mongoose** — MongoDB ODM
- **Bcryptjs** — Password hashing
- **JWT** — Authentication
- **Multer** — File upload handling (memory storage)
- **Cloudinary** — Cloud image storage
- **CORS** — Cross-origin requests

### Frontend
- **React** — UI library
- **React Router** — Client-side routing
- **Axios** — HTTP client
- **CSS3** — Styling

### Infrastructure
- **MongoDB Atlas** — Cloud database
- **Vercel** — Backend + Frontend deployment
- **Cloudinary** — Image CDN and storage

---

## Project Structure

```
MERN-E-Commerce/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── cloudinary.js        # Cloudinary + Multer config
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── customerController.js
│   │   └── feedbackController.js
│   ├── middleware/
│   │   └── auth.js              # JWT protect & authorize
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js
│   │   ├── Customer.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Feedback.js
│   ├── routes/                  # API endpoints
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── customers.js
│   │   └── feedback.js
│   ├── scripts/
│   │   └── createAdmin.js       # Admin user creation script
│   ├── server.js                # Main server entry point
│   ├── vercel.json              # Vercel serverless config
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/          # Navbar, Footer
    │   ├── pages/               # Page components
    │   ├── services/            # Axios API calls
    │   ├── styles/              # CSS files
    │   ├── App.js
    │   └── index.js
    ├── vercel.json              # React Router rewrite rules
    └── package.json
```

---

## Features

✅ **Customer Management** — Registration, login, profile with picture, address  
✅ **Product Management** — Add/Edit/Delete products with Cloudinary image upload (Admin only)  
✅ **Order Management** — Place orders, track status, admin order control  
✅ **Shopping Cart** — localStorage-based cart with item management  
✅ **JWT Authentication** — Secure token-based auth stored in localStorage  
✅ **Role-Based Access** — Admin and Customer roles with protected routes  
✅ **Feedback System** — Submit and manage contact/feedback forms  
✅ **Admin Dashboard** — Manage products, customers, orders, feedback  

---

## API Endpoints

### Authentication
```
POST   /api/auth/customer-signup     Register new customer
POST   /api/auth/customer-login      Customer login
POST   /api/auth/admin-login         Admin login
GET    /api/auth/me                  Get current user (Protected)
```

### Products
```
GET    /api/products                 Get all products
GET    /api/products/:id             Get single product
POST   /api/products                 Add product (Admin)
PUT    /api/products/:id             Update product (Admin)
DELETE /api/products/:id             Delete product (Admin)
```

### Orders
```
GET    /api/orders                   Get all orders (Admin)
GET    /api/orders/my-orders         Get my orders
POST   /api/orders                   Place order
PUT    /api/orders/:id               Update order status (Admin)
DELETE /api/orders/:id               Delete order (Admin)
```

### Customers
```
GET    /api/customers/all            Get all customers (Admin)
GET    /api/customers/profile        Get customer profile
PUT    /api/customers/profile        Update customer profile
DELETE /api/customers/:id            Delete customer (Admin)
```

### Feedback
```
GET    /api/feedback                 Get all feedback
POST   /api/feedback                 Submit feedback
DELETE /api/feedback/:id             Delete feedback (Admin)
```

---

## Local Development Setup

### Prerequisites
- Node.js v14+
- npm or yarn
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the repo
```bash
git clone https://github.com/mehdi-dev-code/MERN_Project_E-commerce-website.git
cd MERN_Project_E-commerce-website
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Fill in your .env values (see Environment Variables section)
npm install
npm start
# Development with auto-reload:
npm run dev
```
Backend runs at: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm install
npm start
```
Frontend runs at: `http://localhost:3000`

---

## Environment Variables

### Backend (`backend/.env`)
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/shopwave
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Deployment

This project is deployed on **Vercel** (both frontend and backend) with **MongoDB Atlas** and **Cloudinary**.

### Backend deployment
- Root Directory: `backend`
- Framework: Other
- Build Command: *(empty)*
- Required env vars: `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NODE_ENV=production`

### Frontend deployment
- Root Directory: `frontend`
- Framework: Create React App
- Required env var: `REACT_APP_API_URL=https://your-backend.vercel.app/api`

---

## Security

- Passwords hashed with **bcrypt** (salt rounds: 10)
- API routes protected with **JWT middleware**
- Admin routes additionally protected with **role authorization**
- CORS restricted to allowed origins only
- Environment variables never committed to version control

---

## Future Enhancements

- [ ] Stripe payment gateway integration
- [ ] Email notifications (order confirmation, password reset)
- [ ] Product search and category filtering
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Admin analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Inventory management

---

## Author

Developed by **Mehdi Ali**  
📧 mehdi035559@gmail.com

---

## License

MIT License — free to use for personal or commercial projects.