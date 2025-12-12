const mongoose = require('mongoose'); 

const entrySchema = mongoose.Schema({
  id: {
    type: Number, 
    required: true, 
    unique: true, 
  }, 
  title: String, 
  img: String,
  dateCreated: {
    type: Date, 
    default: Date.now
  },
  dateUpdated: Date, 
  story: String
}); 

const diarySchema = mongoose.Schema({
  userId: {type: String, required: true, unique: true},
  description: String, 
  entries: [entrySchema],
}); 

module.exports = mongoose.model("Diary", diarySchema); 
