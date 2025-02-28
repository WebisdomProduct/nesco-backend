const mongoose = require('mongoose');

const AboutDocuments = new mongoose.Schema({
  name: { type: String},
  document: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('AboutDocuments', AboutDocuments);