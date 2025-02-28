// models/PhotoGallery.js
const mongoose = require("mongoose");

const PhotoGallerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PhotoGallery", PhotoGallerySchema);
