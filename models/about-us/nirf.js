const mongoose = require('mongoose');

const NirfDocuments = new mongoose.Schema({
  name: { type: String},
  document: { type: String },
  year: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('NirfDocuments', NirfDocuments);