// models/StudentAffairs.js
const mongoose = require('mongoose');

const campusEventSchema = new mongoose.Schema({
  date: { type: String }, 
  day: { type: String }, 
  link: { type: String },
  title: { type: String },
});

const StudentAffairsSchema = new mongoose.Schema(
  {
    image: { type: String }, 
    description: { type: String },
    color: { type: String },
    campus_events: [campusEventSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentAffairs', StudentAffairsSchema);