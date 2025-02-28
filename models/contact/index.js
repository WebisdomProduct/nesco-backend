// models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    inquiry_type: { type: String, required: true },
    inquiry: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);