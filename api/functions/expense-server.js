const crypto = require('crypto');

//NEW USER
function newUser(req) {
  let balance = 0; 
  if(req.body.balance && typeof req.body.balance !== "number") 
    balance = parseFloat(req.body.balance);

  const expense = {
    currency: req.body.currency, 
    description: req.body.description, 
    balance: balance, 
    transactions: []
  }; 

  return expense; 
}

//ADD TRANSACTION
function newTransaction(transactions,req, res) {
  if (!req.body.date || !req.body.object || !req.body.price) {
    return res.status(400).json({ error: 'Missing parameters' }); 
  }

  let price = req.body.price; 
  if (price && typeof price !== 'number') {
    price = parseFloat(price); 
  }

  const id = crypto.createHash('md5').update(req.body.date + req.body.object + req.body.price).digest('hex'); 

  if (transactions.some((transaction) => transaction.id === id)) {
    return res.status(409).json({ error: 'Transaction already exists' }); 
  }

  const transaction = {
    id, 
    date: req.body.date, 
    object: req.body.object, 
    price,
    location: req.body.location || '-'
  }; 
  return transaction; 
}

module.exports = {newUser, newTransaction};
