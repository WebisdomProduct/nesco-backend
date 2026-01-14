const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      address1: { type: String, required: true },
      address2: { type: String, required: true },
      city: { type: String, required: true },
      phone1: { type: String, required: true },
      contact: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("contact-us", contactSchema);
module.exports = Contact;
