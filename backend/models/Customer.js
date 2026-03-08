const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  profilePic: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    required: true,
    maxlength: 40,
  },
  mobile: {
    type: String,
    required: true,
    maxlength: 20,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Get full name
customerSchema.virtual('fullName').get(function () {
  return this.user.firstName + ' ' + this.user.lastName;
});

module.exports = mongoose.model('Customer', customerSchema);
