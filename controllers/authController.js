// controllers/authController.js
const authService = require('../services/authService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);  // Destructure to get both user and token
    res.json({
      message: 'Login successful',
      user,
      token, 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
      const { email, newPassword } = req.body;
    await authService.updatePassword(email, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  updatePassword,
};
