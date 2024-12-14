const express = require("express");
const router = express.Router();
const arimaController = require("../controllers/arimaController");

router.get("/predict", arimaController.getArimaPrediction);

module.exports = router;
