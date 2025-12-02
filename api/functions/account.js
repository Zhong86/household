const bcrypt = require('bcryptjs'); //password hashing

//CREATE
async function createAcc(db, req, res) {
  if (!req.body.user) {
    return res.status(400).json({ error: "Missing parameters" }); 
  }
  
  //check if acc already exist
  if (db[req.body.user]) {
    return res.status(409).json({ error: 'User already exist' });
  }

  const user = req.body.user;
  const pass = req.body.pass; 

  const hashedPass = await bcrypt.hash(pass, 12);

  const acc = {
    user: user, 
    pass: hashedPass
  };
  console.log(acc);
  return acc;
}

module.exports = {
  createAcc
}
