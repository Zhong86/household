const express = require('express'); 
const router = express.Router(); 
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 

//GET ALL
router.get('/accounts', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
}); 

//CREATE 
router.post('/accounts', async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.pass, 12); 
  const user = new User({
    user: req.body.user, 
    pass: hashedPass
  }); 
  try {
    const newUser = await user.save(); 
    res.status(201).json(newUser); 
  } catch (error) {
    res.status(400).json({message: error.message }); 
  }
}); 

//GET ONE
router.post('/login', getUser, async (req, res) => {
  const pass = res.user.pass; 
  try {
    const correct = await bcrypt.compare(req.body.pass, pass);
    if (correct) {
      res.send(res.user); 
    } else 
      res.status(400).send('Password is wrong');
  } catch (error) {
    res.status(500).json({
      message: error.message, 
      received: req.body
    }); 
  }
}); 

//UPDATE
router.patch('/accounts/:user', getUser, async (req, res) => {
  if (req.body.user != null) {
    res.user.user = req.body.user;
  }
  if (req.body.pass != null) {
    res.user.pass = await bcrypt.hash(req.body.pass, 12); 
  }
  try {
    const updatedUser = await res.user.save(); 
    res.json(updatedUser); 
  } catch (error) {
    res.status(400).json({message: error.message }); 
  }
});

//DELETE 
router.delete('/accounts/:user', async (req, res) => {
  try {
    await User.findOneAndDelete({user: req.params.user}); 
    res.json({ message: 'Deleted user'}); 
  } catch (error) {
    res.status(500).json({message: error.message}); 
  }
}); 

//MIDDLEWARE
async function getUser(req, res, next) {
  try {
    user = await User.findOne({user: req.body.user || req.params.user}); 
    if (user == null) {
      return res.status(404).json({message: 'User not found'})
    }
  } catch (error) {
    return res.status(500).json({message: error.message}); 
  }

  res.user = user; 
  next(); 
}

module.exports = router;
