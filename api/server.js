const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
require('dotenv').config(); 

const api = '/api';
const port = process.env.PORT || 5000; 

//store data
mongoose.connect(process.env.DATABASE_URL); 
const db = mongoose.connection; 
db.once('open', () => console.log('Connected to database')); 
db.on('error', (error) => console.error(error)); 

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

app.use(cors()); 
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(express.json()); 

const accRouter = require('./routes/accRoute'); 
app.use(api, accRouter); 

const expenseRouter = require('./routes/expenseRoute'); 
app.use(api, expenseRouter); 

const galleryRouter = require('./routes/galleryRoute'); 
app.use(api, galleryRouter); 

//Router
app.listen(port, '0.0.0.0', () => {
  console.log('Entered server: ' + port); 
}); 
