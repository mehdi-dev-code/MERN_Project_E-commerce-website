const User = require('../models/User');
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Customer Signup
exports.customerSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, mobile, address, profilePic } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create user
    user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
      isAdmin: false,
    });

    // Create customer profile
    const customer = await Customer.create({
      user: user._id,
      address,
      mobile,
      profilePic: req.file ? req.file.path : null,
    });

    // Get token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user,
      customer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Signup
exports.adminSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ success: false, message: 'Admin user already exists' });
    }

    // Create admin user
    user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
      isAdmin: true,
    });

    // Get token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user,
      message: 'Admin account created successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Customer Login
exports.customerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if user is customer
    if (user.isAdmin) {
      return res.status(401).json({ success: false, message: 'This login is for customers only' });
    }

    // Get token
    const token = generateToken(user._id);

    const customer = await Customer.findOne({ user: user._id }).populate('user');

    res.status(200).json({
      success: true,
      token,
      user,
      customer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    // Check for user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(401).json({ success: false, message: 'This login is for admins only' });
    }

    // Get token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Current User
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
