const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Auth routes
router.post('/customer-signup', authController.customerSignup);
router.post('/admin-signup', authController.adminSignup);
router.post('/customer-login', authController.customerLogin);
router.post('/admin-login', authController.adminLogin);
router.get('/me', protect, authController.getCurrentUser);

module.exports = router;
