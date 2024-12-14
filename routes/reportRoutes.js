// routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/category", reportController.categoryReport);
router.get("/incomeExpense", reportController.getIncomeExpenseReport);
router.get(
  "/groupByCategory",
  authMiddleware,
  reportController.groupByCategory
);
router.get(
  "/timeByCategory",
  authMiddleware,
  reportController.getTimeByCategory
);
// router.get('/monthly', reportController.monthlyReport);
router.get("/yearly", reportController.getYearlyReport);
router.get(
  "/categoryTrends",
  authMiddleware,
  reportController.getCategoryTrends
);

module.exports = router;
