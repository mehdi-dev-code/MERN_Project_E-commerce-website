# Quick Start Guide

Follow these steps to get your MERN e-commerce application up and running.

## Prerequisites Check

```bash
# Check Node.js version (should be v14 or higher)
node --version

# Check npm version
npm --version

# Check MongoDB (if using local)
mongod --version
```

## Step 1: Set Up MongoDB

### Option A: Local MongoDB
```bash
# Make sure MongoDB service is running on your system
# Windows: MongoDB should be running as a service
mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Copy your connection string
4. Use it in your `.env` file

## Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Copy the example environment file
copy .env.example .env

# Edit .env file with your settings:
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: A strong secret key (e.g., "your_super_secret_key_12345")
# - PORT: 5000 (or any available port)

# Install all dependencies
npm install

# Start the backend server
npm start

# For development with hot-reload:
npm run dev
```

**Expected Output:**
```
MongoDB Connected: localhost
Server running on port 5000
```

## Step 3: Frontend Setup (New Terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install all dependencies
npm install

# Start the React development server
npm start
```

**Expected Output:**
```
Compiled successfully!
On Your Network: http://192.168.x.x:3000
```

Your browser should automatically open `http://localhost:3000`

## Step 4: Test the Application

### Test Customer Signup
1. Click "Customer Signup"
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Username: johndoe
   - Password: password123
   - Mobile: 1234567890
   - Address: 123 Main Street
3. Click "Sign Up"

### Test Customer Login
1. Click "Customer Login"
2. Enter credentials:
   - Username: johndoe
   - Password: password123
3. You should be logged in and able to access the home page

### Test Admin Login
1. Create an admin user via MongoDB (see instructions below)
2. Click "Admin Login"
3. Enter admin credentials

## Creating an Admin Account

### Via MongoDB Compass or Command Line

```bash
# Connect to your MongoDB instance
mongo

# Select database
use ecommerce

# Find the user you want to make admin
db.users.findOne({ username: "johndoe" })

# Update the user to be admin
db.users.updateOne(
  { username: "johndoe" },
  { $set: { isAdmin: true } }
)

# Verify the change
db.users.findOne({ username: "johndoe" })
```

## Verify Installation

### Backend Health Check
```bash
curl http://localhost:5000/
# Should return: { "message": "Welcome to E-commerce API" }
```

### Get Products
```bash
curl http://localhost:5000/api/products
# Should return: { "success": true, "products": [] }
```

## Common Issues & Solutions

### Issue: "MongoDB connection failed"
**Solution:**
- Ensure MongoDB is running
- Check connection string in .env
- Verify firewall isn't blocking port 27017

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Change PORT in .env to 5001 or another available port
# Or kill the process using port 5000:
# Windows: netstat -ano | findstr :5000
# Unix: lsof -i :5000
```

### Issue: "Cannot find modules" (npm ERR!)
**Solution:**
```bash
# Delete node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### Issue: "CORS error in browser"
**Solution:**
- Ensure FRONTEND_URL in backend .env is `http://localhost:3000`
- Clear browser cache (Ctrl+Shift+Delete)
- Restart both servers

### Issue: "Frontend can't connect to backend"
**Solution:**
- Check if backend is running on port 5000
- Check browser console for error messages
- Verify proxy in frontend package.json: `"proxy": "http://localhost:5000"`

## Project Navigation

### Important Files
- Backend config: `backend/.env`
- API routes: `backend/routes/`
- React pages: `frontend/src/pages/`
- Global styles: `frontend/src/index.css`

### Database Collections
After first sign up, MongoDB will have:
- `users` - User accounts
- `customers` - Customer profiles
- `products` - Products
- `orders` - Orders
- `feedbacks` - Feedback

## Development Workflow

### During Development
1. Keep backend server running (Terminal 1)
2. Keep frontend server running (Terminal 2)
3. Edit code - changes auto-reload
4. Check browser console for errors
5. Check backend console for API errors

### Adding New Features
1. Create backend route in `backend/routes/`
2. Create controller in `backend/controllers/`
3. Create API service in `frontend/src/services/`
4. Create React component in `frontend/src/components/` or `pages/`
5. Test in browser

## Server Ports

- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:3000`
- **MongoDB**: `localhost:27017` (local only)

## Next Steps

1. Add more products via admin dashboard
2. Implement payment gateway integration
3. Add email notifications
4. Deploy to production (Heroku, AWS, etc.)
5. Set up CI/CD pipeline

## Need Help?

- Check `README.md` in project root
- Look at API examples in this guide
- Check browser console for frontend errors
- Check terminal console for backend errors
- Refer to documentation:
  - Express: https://expressjs.com/
  - React: https://react.dev/
  - Mongoose: https://mongoosejs.com/
  - JWT: https://jwt.io/

---

**Happy coding! Your e-commerce platform is ready.** 🎉
