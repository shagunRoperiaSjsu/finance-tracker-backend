// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.put('/password', authController.updatePassword);
router.get('/status', (req, res) => {
    res.status(200).json({ message: 'Server is running and routes are loaded.' });
});

module.exports = router;
