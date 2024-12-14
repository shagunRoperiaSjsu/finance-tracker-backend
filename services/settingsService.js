// services/settingsService.js
const User = require('../models/userModel');

// Get user settings
const getUserSettings = async (userId) => {
  const user = await User.findOne({ userid: userId });
  if (!user) throw new Error('User not found');
  return user.userpreferences;
};

// Update user settings
const updateUserSettings = async (userId, preferences) => {
  const user = await User.findOne({ userid: userId });
  if (!user) throw new Error('User not found');
  user.userpreferences = { ...user.userpreferences, ...preferences };
  await user.save();
  return user.userpreferences;
};

module.exports = {
  getUserSettings,
  updateUserSettings
};
