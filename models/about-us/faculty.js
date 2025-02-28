const mongoose = require("mongoose");

const Faculty = new mongoose.Schema(
  {
    name: { type: String },
    profile_image: { type: String },
    email: { type: String },
    linkedin_url: { type: String },
    twitter_link: { type: String },
    facebook_link: { type: String },
    instagram_link: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", Faculty);
