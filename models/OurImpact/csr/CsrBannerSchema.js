const mongoose = require("mongoose");

const csrBannerSchema = new mongoose.Schema({
  image: {
    type: String,   // Desktop Image
    required: true,
  },

  mobileImage: {
    type: String,   // Mobile Image
  },

  paragraph1: {
    type: String,
  },

  paragraph2: {
    type: String,
  },
});

const csrBannerModel = mongoose.model(
  "CSRBanner",
  csrBannerSchema
);

module.exports = csrBannerModel;
