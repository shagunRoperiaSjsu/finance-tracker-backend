const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date, // This should be of type Date
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  amount: {
    type: Number, // Use Number for floating-point values (Double in MongoDB)
    required: true
  },
  type: {
    type: String,
    enum: ['Income', 'Expense'],
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
