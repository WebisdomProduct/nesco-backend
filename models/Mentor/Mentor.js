// models/Mentor.js
const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pageName:{
    type:String,
    required:true
  },
  designation: {
    type: String,
    required: true,
  },
  noteTitle: {
    type: String, // e.g., "A note from the Founding Director and Mentor"
    required: true,
  },
  noteText: {
    type: [String], 
    required: true,
  },
  mentorImage: {
    type: String, 
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Mentor', mentorSchema);
