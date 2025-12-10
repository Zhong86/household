const crypto = require('crypto');

//CREATE
function createEntry(entries, req, res) {
  if(!req.body.story || !req.body.title) {
    return res.status(400).json({ error: 'Missing parameters' }); 
  }
  
  const date = req.body.date;
  let id = '';

  do {
    id = date + crypto.randomBytes(8).toString('hex'); 
  } while (entries.some((entry) => entry.id === id));
  
  const entry = {
    id: id, 
    title: req.body.title, 
    img: req.body.img, 
    dateCreated: date, 
    dateUpdated: date, 
    story: req.body.story
  };
  return entry;
}

//EDIT
function editEntry(req, res) {
  
}

//DELETE
function deleteEntry(acc, id, res) {
  const getIndex = acc.diary.findIndex(
    (entry) => entry.id === id
  );

  if (getIndex === -1) {
    return res.status(404).json({ error: 'Diary entry does not exist' }); 
  }
  
  //removes the entry at index getIndex, for 1 element
  const updatedAcc = acc.diary.splice(getIndex, 1);
  return updatedAcc;
}

module.exports ={
  createEntry,
  deleteEntry
};
