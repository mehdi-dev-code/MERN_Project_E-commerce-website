const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    default: null,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  email: {
    type: String,
    maxlength: 50,
  },
  address: {
    type: String,
    maxlength: 500,
  },
  mobile: {
    type: String,
    maxlength: 20,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Order Confirmed', 'Out for Delivery', 'Delivered'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('Order', orderSchema);
