// services/authService.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Login user
const loginUser = async (email, password) => {
  
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  // Check if password is correct
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) throw new Error('Invalid credentials');

  // Create JWT token
  const payload = {
    email: user.email,
    name: user.name,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // 1 hour expiration

  return { user, token }; // Return both user data and the token
};

// Update user password
const updatePassword = async (email, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  user.password = newPassword;
  await user.save();
};

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
};
