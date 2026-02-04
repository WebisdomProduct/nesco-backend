const mongoose = require("mongoose");

const lifeAtNescobannerSchema = new mongoose.Schema({
  image: {
    type: String,   // Desktop
    required: true,
  },

  mobileImage: {
    type: String,   // Mobile
  },

  paragraph1: { type: String },
  paragraph2: { type: String },
  paragraph3: { type: String },
  paragraph4: { type: String },

}, { timestamps: true });

module.exports = mongoose.model(
  "LifeAtNescoBanner",
  lifeAtNescobannerSchema
);
