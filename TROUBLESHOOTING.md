# Troubleshooting & FAQ

Common issues and their solutions for the MERN E-Commerce application.

## Backend Issues

### MongoDB Connection Problems

**Issue:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
1. **Ensure MongoDB is running:**
   ```bash
   # Windows (if installed as service)
   net start MongoDB
   
   # Or start mongod manually:
   mongod
   ```

2. **Check connection string in .env:**
   ```
   # For local MongoDB
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   
   # For MongoDB Atlas (Cloud)
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   ```

3. **Verify firewall settings:**
   - Ensure port 27017 is not blocked
   - Check Windows Firewall / Network settings

4. **Test connection:**
   ```bash
   mongo mongodb://localhost:27017/ecommerce
   ```

---

### Server Won't Start

**Issue:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
1. **Change port in .env:**
   ```
   PORT=5001
   ```

2. **Kill the process using the port:**
   ```bash
   # Windows - Find process on port 5000
   netstat -ano | findstr :5000
   
   # Kill process by PID (replace PID)
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -i :5000
   kill -9 <PID>
   ```

3. **Restart the server:**
   ```bash
   npm start
   ```

---

### Cannot Find Module Errors

**Issue:** `Error: Cannot find module 'express'` or similar

**Solutions:**
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   rm -r node_modules package-lock.json
   npm install
   ```

3. **Use the correct Node version:**
   ```bash
   node --version  # Should be v14 or higher
   ```

---

### JWT Token Issues

**Issue:** `Error: Not authorized to access this route` even with valid token

**Solutions:**
1. **Verify JWT_SECRET in .env:**
   ```
   JWT_SECRET=your_super_secret_key_here
   ```
   - Must be the same in backend
   - Cannot be empty or default

2. **Check token format:**
   ```javascript
   // Should be: Bearer <token>
   // Not: <token>
   // Not: Token <token>
   ```

3. **Verify token hasn't expired:**
   ```javascript
   // Default expiration: 30 days
   // You can decode at jwt.io to check
   ```

4. **Clear expired tokens:**
   - Clear localStorage in browser
   - Logout and login again

---

### File Upload Issues

**Issue:** `Error: ENOENT: no such file or directory, open 'uploads/product_image/...'`

**Solutions:**
1. **Create upload directories:**
   ```bash
   mkdir -p uploads/product_image
   mkdir -p uploads/profile_pic/CustomerProfilePic
   ```

2. **Check file permissions:**
   ```bash
   # macOS/Linux
   chmod -R 755 uploads/
   ```

3. **Verify multer configuration:**
   - Check destination path in route files
   - Ensure path is relative to server.js location

4. **Validate file upload in POST request:**
   ```bash
   # Use -F for file uploads, not -d
   curl -F "productImage=@path/to/image.jpg" \
     -F "name=Product" \
     http://localhost:5000/api/products
   ```

---

### CORS (Cross-Origin) Errors

**Issue:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
1. **Check CORS configuration in server.js:**
   ```javascript
   app.use(cors());  // Should be present
   ```

2. **Verify FRONTEND_URL in .env:**
   ```
   FRONTEND_URL=http://localhost:3000
   ```

3. **Check browser console:**
   - Look for specific origin being blocked
   - Ensure frontend is on same origin or CORS is enabled

4. **Test CORS with curl:**
   ```bash
   curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: GET" \
     http://localhost:5000/api/products
   ```

---

## Frontend Issues

### Cannot Connect to Backend

**Issue:** `Error: Cannot POST http://localhost:5000/api/auth/customer-login`

**Solutions:**
1. **Ensure backend is running:**
   ```bash
   # In another terminal
   cd backend
   npm start
   ```

2. **Verify backend URL in frontend:**
   ```javascript
   // Check frontend/src/services/api.js
   const API_BASE_URL = 'http://localhost:5000/api';
   ```

3. **Check package.json proxy setting:**
   ```json
   "proxy": "http://localhost:5000"
   ```

4. **Clear browser cache:**
   - Ctrl+Shift+Delete or Cmd+Shift+Delete
   - Check "Cookies and cached media"
   - Reload page

---

### React Component Errors

**Issue:** `Error: Cannot read property of undefined`

**Solutions:**
1. **Use optional chaining:**
   ```javascript
   // Bad
   user.firstName
   
   // Good
   user?.firstName
   ```

2. **Provide default values:**
   ```javascript
   const [user, setUser] = useState(null);
   
   // Check before using
   if (!user) return <div>Loading...</div>;
   ```

3. **Check API response structure:**
   ```javascript
   console.log(response.data);  // Verify response format
   ```

---

### Styling/CSS Issues

**Issue:** Styles not applied or page looks broken

**Solutions:**
1. **Check CSS file imports:**
   ```javascript
   import '../styles/navbar.css';
   ```

2. **Verify CSS file exists:**
   - Check if file path is correct
   - Ensure file is in correct directory

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
   - Clear browser cache and reload

4. **Check CSS syntax:**
   - Ensure no syntax errors in CSS files
   - Use browser DevTools to inspect elements

---

### Form Submission Issues

**Issue:** Form submits but nothing happens

**Solutions:**
1. **Check form validation:**
   ```javascript
   if (!username || !password) {
     alert('Please fill all fields');
     return;
   }
   ```

2. **Verify API endpoint:**
   ```javascript
   // Console log the request
   console.log('Submitting to:', '/api/auth/customer-login');
   ```

3. **Check response handling:**
   ```javascript
   .then(response => console.log(response))
   .catch(error => console.error(error))
   ```

4. **Ensure button type is correct:**
   ```javascript
   <button type="submit">Submit</button>  // Not type="button"
   ```

---

### localStorage Issues

**Issue:** Token or data not persisting

**Solutions:**
1. **Check if localStorage is enabled:**
   ```javascript
   try {
     localStorage.setItem('test', 'test');
     localStorage.removeItem('test');
   } catch (e) {
     console.error('localStorage not available');
   }
   ```

2. **Verify data is being saved:**
   ```javascript
   // In browser console
   localStorage.getItem('token')  // Should return token
   localStorage.getItem('user')   // Should return user data
   ```

3. **Clear and reset:**
   ```javascript
   localStorage.clear();  // Clear all
   location.reload();     // Reload page
   ```

---

## Database Issues

### User Cannot Login After Registration

**Issue:** User registered but cannot login

**Solutions:**
1. **Verify user in database:**
   ```javascript
   // In MongoDB shell
   db.users.findOne({ username: "johndoe" })
   ```

2. **Check password hashing:**
   - Password should be hashed (bcrypt)
   - Cannot be plain text

3. **Case sensitivity:**
   - Usernames might be case-sensitive
   - Try exact case from registration

4. **Check user creation:**
   ```javascript
   // Ensure user.save() is called
   // Ensure response contains token
   ```

---

### Cannot Create Admin Account

**Issue:** Admin login doesn't work

**Solutions:**
1. **Make user admin via MongoDB:**
   ```javascript
   db.users.updateOne(
     { username: "johndoe" },
     { $set: { isAdmin: true } }
   )
   ```

2. **Verify admin flag:**
   ```javascript
   // Check isAdmin is true
   db.users.findOne({ username: "johndoe" })
   ```

3. **Re-login after update:**
   - Logout
   - Clear localStorage
   - Login again

---

## Performance Issues

### Slow API Responses

**Issue:** API is slow or timing out

**Solutions:**
1. **Check network tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Make request and check time

2. **Optimize database queries:**
   ```javascript
   // Add indexes for frequently searched fields
   db.users.createIndex({ username: 1 })
   db.products.createIndex({ name: 1 })
   ```

3. **Implement pagination:**
   ```javascript
   // Get only needed data
   const limit = 10;
   const skip = (page - 1) * limit;
   Product.find().limit(limit).skip(skip);
   ```

4. **Enable compression:**
   ```javascript
   // Already in server.js
   app.use(express.json());
   ```

---

### Frontend Slow to Load

**Issue:** React app takes long to load

**Solutions:**
1. **Check bundle size:**
   ```bash
   npm run build
   # Check size of build folder
   ```

2. **Enable lazy loading:**
   ```javascript
   const HomePage = React.lazy(() => import('./pages/HomePage'));
   ```

3. **Optimize images:**
   - Use compressed images
   - Use WebP format if supported

4. **Check for console errors:**
   - Open DevTools
   - Check Console tab for errors

---

## Deployment Issues

### Cannot Deploy to Production

**General Tips:**
1. **Environment variables:**
   - Set all .env variables in production
   - Never commit .env file

2. **Database connection:**
   - Use production database URL
   - Ensure IP whitelist includes server

3. **API URLs:**
   - Use production API URL in frontend
   - Update FRONTEND_URL in backend

4. **HTTPS:**
   - Use HTTPS in production
   - Update API URLs to https://

---

## General Debugging Tips

1. **Check browser console:**
   - F12 or Ctrl+Shift+I
   - Look for red error messages
   - Check Network tab for failed requests

2. **Check backend terminal:**
   - Look for error messages
   - Check API response logs

3. **Use console.log:**
   ```javascript
   // Log data at various points
   console.log('User:', user);
   console.log('Response:', response);
   ```

4. **Use browser Network tab:**
   - See what's being sent
   - See what's being received
   - Check response status codes

5. **Test with cURL:**
   ```bash
   curl -X GET http://localhost:5000/api/products
   ```

6. **Use Postman/Insomnia:**
   - Test API endpoints directly
   - Save request/response for debugging

---

## FAQ

**Q: Can I use this in production?**
A: Yes, but implement proper validation, error handling, and security measures. Consider:
- Rate limiting
- Input validation
- SQL/NoSQL injection prevention
- HTTPS/TLS encryption
- Regular security audits

**Q: How do I add more features?**
A: Follow the pattern:
1. Create controller in backend
2. Create route in routes file
3. Create service in frontend
4. Create component/page in frontend

**Q: How do I migrate from SQLite to MongoDB?**
A: The conversion is designed for MongoDB. If you're coming from SQLite/PostgreSQL:
1. Export data from old database
2. Transform to JSON format
3. Import to MongoDB using mongoimport

**Q: How do I implement payment gateway?**
A: 
1. Choose provider (Stripe, Razorpay, etc.)
2. Install SDK: `npm install stripe`
3. Create payment endpoint
4. Integrate with order creation
5. Handle webhook notifications

**Q: How do I send emails?**
A: Nodemailer is already configured:
1. Set EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD in .env
2. Use transporter.sendMail() in controller
3. Send welcome, order confirmation emails

**Q: How do I add more user roles?**
A: Modify the authorization middleware:
1. Add role field to User model
2. Update authorize middleware
3. Use `@authorize('role')` on routes

---

**Still having issues?**
1. Check the main README.md
2. Check QUICK_START.md for setup
3. Check API_DOCUMENTATION.md for endpoints
4. Review CONVERSION_GUIDE.md for Django → MERN mapping
5. Check GitHub issues or Stack Overflow with error message

---

**Last Updated**: January 2024
