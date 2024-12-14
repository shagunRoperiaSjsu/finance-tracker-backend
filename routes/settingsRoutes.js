// routes/settingsRoutes.js
const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', settingsController.getUserSettings);
router.put('/', settingsController.updateUserSettings);

module.exports = router;
