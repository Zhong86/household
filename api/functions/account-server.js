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
    pass: hashedPass, 
    expense: {}, 
    diary: {}, 
  };
  console.log(acc);
  return acc;
}

async function getAcc(db, req, res) {
  const user = db[req.body.user];
  if(!user)
    return res.status(404).json({error: 'User does not exist'}); 
  
  const hashedPass = user.pass;
  const correctPass = await bcrypt.compare(req.body.pass, hashedPass); 
  if (!correctPass) 
    return res.status(400).json({
      ok: false, 
      error: 'Password is wrong'
    });
  
  return user;
}


module.exports = {
  createAcc, 
  getAcc
}
