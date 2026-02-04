const mongoose = require("mongoose");

const philosophySchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,

  image: {
    type: String,   // Desktop Image
  },

  mobileImage: {
    type: String,   // Mobile Image
  },

  video: {
    type: String,   // URL or uploaded file
  }

}, { timestamps: true });

module.exports = mongoose.model("Philosophy", philosophySchema);
