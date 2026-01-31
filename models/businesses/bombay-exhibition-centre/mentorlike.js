// models/Mentor.js
const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  heading2: {
    type: String,
    required: true,
  },
  heading2:{
    type:String,
    required:true
  },
  heading3: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String, // e.g., "A note from the Founding Director and Mentor"
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },

});

module.exports = mongoose.model('ExtraModel', mentorSchema);
