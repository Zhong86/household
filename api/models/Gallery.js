const mongoose = require('mongoose'); 

const entrySchema = new mongoose.Schema({
  title: String, 
  img: String,
  dateCreated: {
    type: Date, 
    default: Date.now
  },
  dateUpdated: Date, 
  story: String
}); 

const gallerySchema = new mongoose.Schema({
  userId: {type: String, required: true, unique: true},
  description: String, 
  entries: [entrySchema],
}); 

module.exports = mongoose.model("Gallery", gallerySchema); 
