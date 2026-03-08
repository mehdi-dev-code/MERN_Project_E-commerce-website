const express = require('express');
const customerController = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');

const router = express.Router();

// Multer configuration for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_pic/CustomerProfilePic/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Customer routes
router.get('/all', protect, authorize('admin'), customerController.getAllCustomers);
router.get('/profile', protect, customerController.getCustomerProfile);
router.put('/profile', protect, upload.single('profilePic'), customerController.updateCustomerProfile);
router.delete('/:id', protect, authorize('admin'), customerController.deleteCustomer);

module.exports = router;
