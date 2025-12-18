const express = require('express'); 
const router = express.Router(); 
const Expense = require('../models/Expense'); 

//CREATE
router.post('/expense/:userId', async (req, res) => {
  const expense = new Expense({
    userId: req.params.userId, 
    currency: req.body.currency, 
    description: req.body.description, 
    balance: req.body.balance, 
    transactions: [],
  }); 
  try {
    const newExpense = await expense.save(); 
    res.status(201).json(newExpense); 
  } catch (error) {
    res.status(400).json({message: error.message}); 
  }
});

//GET ONE EXPENSE
router.get('/expense/:userId', async (req, res) => {
  try {
    const expense = await Expense.findOne({userId: req.params.userId}); 
    if (!expense) {
      return res.status(404).send(null); 
    }
    res.send(expense); 
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}); 

//========================== TRANSACTION =========================
//CREATE
router.post('/expense/:userId/transactions', async (req, res) => {
  const newTrans = {
    object: req.body.object, 
    price: req.body.price
  };

  if (req.body.date) {
    newTrans.date = req.body.date; 
  }
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      {userId: req.params.userId}, 
      {
        $push: { transactions: newTrans }, 
        $inc: { balance: newTrans.price }, 
      }, 
      { new: true, runValidators: true }
    ); 
    res.json(updatedExpense); 
  } catch (error) {
    res.status(400).json({message: error.message}); 
  }
}); 

//Delete transaction
router.delete('/expense/:userId/transactions/:id', getExpense, async (req, res) => {
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      {userId: req.params.userId}, 
      {
        $pull: { transactions: { _id: req.params.id } }
      }, 
      {new: true}
    ); 
    res.send(updatedExpense); 
  } catch (error) {
    res.status(500).json({message: error.message }); 
  }
}); 

async function getExpense(req, res, next) {
  try {
    expense = await Expense.find({userId: req.params.userId}); 
    if (expense.length == 0) {
      return res.status(404).json({message: 'User not found'}); 
    }
  } catch (error) {
    return res.status(500).json({message: error.message }); 
  }
  res.expense = expense[0]; 
  next(); 
}

module.exports = router; 
