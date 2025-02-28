const mongoose = require('mongoose');

const CircularSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sharable_link: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Circular', CircularSchema);