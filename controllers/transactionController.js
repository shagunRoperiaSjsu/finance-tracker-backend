// controllers/transactionController.js
const transactionService = require("../services/transactionService");

const getTransactions = async (req, res) => {
  try {
    const { userId } = req;
    const transactions = await transactionService.getTransactionsByUserId(
      userId
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { userId } = req;
    req.body.userId = userId;
    const transaction = await transactionService.createTransaction(req.body);
    res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.body;
    const transaction = await transactionService.getTransactionById(id);
    res
      .status(200)
      .json({ message: "Transaction retrieved successfully", transaction });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving transaction", error: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.getTransactionById(
      req.params.id
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id, updateData } = req.body;
    const updatedTransaction = await transactionService.updateTransaction(
      id,
      updateData
    );
    res
      .status(200)
      .json({
        message: "Transaction updated successfully",
        transaction: updatedTransaction,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating transaction", error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedTransaction = await transactionService.deleteTransaction(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res
      .status(200)
      .json({
        message: "Transaction deleted successfully",
        transaction: deletedTransaction,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  getTransactionById,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
