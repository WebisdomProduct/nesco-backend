const mongoose = require("mongoose");

const bombayBannerSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true,
    unique: true
  },

  image1: {
    type: String   // Desktop Image 1
  },

  image2: {
    type: String   // Desktop Image 2
  },

  mobileImage: {
    type: String   // Mobile Image
  }

}, { timestamps: true });

module.exports = mongoose.model("BombayBanner", bombayBannerSchema);
