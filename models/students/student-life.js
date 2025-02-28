// models/StudentLife.js
const mongoose = require('mongoose');

const StudentLifeSchema = new mongoose.Schema(
  {
    title: { type: String }, // Title of the student life section, not required
    description: { type: String }, // Description of the student life section, not required
    image: { type: String }, // Image URL or reference for the student life section, not required
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('StudentLife', StudentLifeSchema);