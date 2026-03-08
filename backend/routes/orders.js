const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Order routes
router.get('/', protect, authorize('admin'), orderController.getAllOrders);
router.get('/my-orders', protect, orderController.getCustomerOrders);
router.post('/', protect, orderController.placeOrder);
router.put('/:id', protect, authorize('admin'), orderController.updateOrderStatus);
router.delete('/:id', protect, authorize('admin'), orderController.deleteOrder);

module.exports = router;
