const User = require('../models/User');
const Customer = require('../models/Customer');

// Get all customers (Admin)
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate('user');

    res.status(200).json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get customer profile
exports.getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findOne({ user: req.user.id }).populate('user');

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer profile not found' });
    }

    res.status(200).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update customer profile
exports.updateCustomerProfile = async (req, res) => {
  try {
    const { firstName, lastName, address, mobile } = req.body;

    const user = await User.findById(req.user.id);
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    await user.save();

    let customer = await Customer.findOne({ user: req.user.id });
    if (address) customer.address = address;
    if (mobile) customer.mobile = mobile;
    if (req.file) customer.profilePic = req.file.path;

    customer = await customer.save();
    customer = await customer.populate('user');

    res.status(200).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete customer (Admin)
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Also delete associated user
    await User.findByIdAndDelete(customer.user);

    res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
