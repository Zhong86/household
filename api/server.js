const express = require('express'); 
const path = require('path'); //file path 
const fs = require('fs'); //filesystem
const bodyParser = require('body-parser'); 
const crypto = require('crypto'); 

//import from local
const { createAcc, getAcc } = require('./functions/account-server.js');
const { newUser, newTransaction } = require('./functions/expense-server.js'); 
const { createEntry, deleteEntry } = require('./functions/diary-server.js');

const port = process.env.PORT || 5000; 
const pages = [
  ['/', 'index.html'], 
  ['/expense', 'bank/index.html'], 
  ['/diary', 'diary/index.html']
];

//store data
const parentDir = path.dirname(__dirname); 
const dataDir = path.resolve(parentDir, 'data'); 
const dataFile = path.join(dataDir, 'users.json');
//load & save db 
function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive:true }); 
  }
}

function loadData() {
  try {
    ensureDataDir(); 
    if (fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile, 'utf8'); //getting raw data
      return JSON.parse(raw); 
    }
  } catch (error) {
    console.error('Failed to load DB file: ', error);
  }
}

function saveData(db) {
  try {
    ensureDataDir(); 
    const tmp = `{dataFile}.tmp`
    fs.writeFileSync(tmp, JSON.stringify(db, null, 2), 'utf8');
    fs.renameSync(tmp, dataFile); 
  } catch (error) {
    console.error('Failed to load DB file: ', error); 
  }
}

const db = loadData(); 

//Express app 
const app = express(); 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router(); 

//ACCOUNT
//Create
router.post('/accounts', async (req,res) => {
  const acc = await createAcc(db, req, res)

  db[req.body.user] = acc;
  console.log(acc);
  saveData(db);

  return res.status(201).json(acc); 
}); 

//GET
router.post('/accounts/:user', async (req, res) => {
  const acc = await getAcc(db, req, res); 

  return res.json(acc);
});

//Expense
router.post('/accounts/:user/expense', (req, res) => {
  const account = db[req.params.user]; 
  if (!account) {
    return res.status(404).json({ error: 'user does not exist' }); 
  }
  const expense = newUser(req); 
  account.expense = expense; 

  saveData(db); 
  return res.status(201).json(account); 

});

//Add new transaction
router.post('/accounts/:user/expense/transactions', (req, res) => {
  const account = db[req.params.user]; 
  const transactions = account.expense.transactions; 
  if (!account) {
    return res.status(404).json({ error: 'user does not exist' }); 
  }

  const transaction = newTransaction(req, res); 
  transactions.push(transaction); 
  account.expense.balance += transaction.price; 

  saveData(db); 
  return res.status(201).json(db[req.params.user]); 
}); 

//Delete transaction
router.delete('/accounts/:user/expense/transactions/:id', (req, res) => {
  const acc = db[req.params.user]; 
  if (!acc) {
    return res.status(404).json({ error: 'User does not exist' });
  }
  const id = req.params.id; 
  const index = acc.expense.transactions.findIndex(
    (transaction) => transaction.id === id
  ); 

  if (index === -1 ) {
    return res.status(404).json({ error: 'Transaction does not exist' }); 
  }

  acc.expense.transactions.splice(index,1); 

  saveData(db); 
  return res.status(200).json(db[req.params.user]); 
}); 
router.options('/accounts/:user/expense/transactions/:id', (req, res) => {
  res.status(200).end();
});

//Diary
router.post('/accounts/:user/diary', (req, res) => {
  const acc = db[req.params.user];
  const entry = createEntry(acc.diary.entries, req, res); 

  acc.entries.push(entry);
  saveData(db);
  return res.status(201).json(entry);
}); 

//Delete
router.delete('/accounts/:user/diary/:id', (req,res) => {
  const acc = db[req.params.user];
  if (!acc) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  const updatedAcc = deleteEntry(acc, req.params.id); 
  acc = updatedAcc; 
  saveData(db);
  return res.status(200).json(acc);
});

//Router
app.use('/api', router); 
app.listen(port, '0.0.0.0', () => {
  console.log('Entered server'); 
}); 
