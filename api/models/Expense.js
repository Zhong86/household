const mongoose = require('mongoose'); 

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date, 
    default: Date.now, 
  }, 
  object: {
    type: String, 
    required: true, 
  }, 
  price: {
    type: Number, 
    required: true, 
  }, 
}); 

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
  },
  currency: String, 
  description: String, 
  balance: Number,
  transactions: [transactionSchema], 
}); 

module.exports = mongoose.model('Expense', expenseSchema); 
