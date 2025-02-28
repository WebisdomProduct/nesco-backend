const mongoose = require('mongoose');

const Leadership = new mongoose.Schema({
  name: { type: String},
  description: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  profile:{ type: String}
}, { timestamps: true });

module.exports = mongoose.model('Leadership', Leadership);