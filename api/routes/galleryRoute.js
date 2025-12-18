const express = require('express'); 
const router = express.Router(); 
const Gallery = require('../models/Gallery'); 

//CREATE
router.post('/gallery/:userId', async (req, res) => {
  const gallery = new Gallery({
    userId: req.params.userId, 
    description: req.body.description, 
    entries: []
  }); 
  try {
    const newGallery = await gallery.save(); 
    res.status(201).json(newGallery); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
}); 

//GET
router.get('/gallery/:userId', async (req, res) => {
  try {
    const gallery = await Gallery.findOne({userId: req.params.userId }); 
    if(!gallery) return res.status(404).send(null); 
    res.send(gallery); 
  } catch (error) {
    res.status(500).json({message: error.message }); 
  }
}); 

//============================== ENTRIES ===================================

//CREATE
router.post('/gallery/:userId/entries/:id', (req, res) => {
  const newEntry = {
    title: req.body.title, 
    // img: something, 
    story: req.body.story
  }; 
  if(req.body.dateCreated) 
    newEntry.dateCreated = req.body.dateCreated; 

  newEntry.dateUpdated = req.body.dateCreated; 
  try {
    const updatedGallery = Gallery.findOneAndUpdate(
      {userId: req.params.userId}, 
      {
        $push: { entries: newEntry}
      }, 
      {new: true}
    ); 
    res.json(updatedGallery); 
  } catch (error) {
    res.status(400).json({message: error.message }); 
  }
}); 

//EDIT
router.patch('/gallery/:userId/entries/:id', (req, res) => {
  
}); 

//DELETE
router.delete('/gallery/:userId/entries/:id', async (req, res) => {
  try {
    const updatedGallery = await Gallery.findOneAndUpdate(
      {userId: req.params.userId}, 
      {
        $pull: {entries: { _id: req.params.id }}
      }, 
      {new: true}
    ); 
    res.send(updatedGallery); 
  } catch (error) {
    res.status(500).json({message: error.message});  
  }
}); 

module.exports = router; 
