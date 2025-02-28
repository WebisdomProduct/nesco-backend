const mongoose = require('mongoose');

const AcademicCouncil = new mongoose.Schema({
  name: { type: String},
  position: { type: String },
  role: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }, // New status field
}, { timestamps: true });

module.exports = mongoose.model('AcademicCouncil', AcademicCouncil);