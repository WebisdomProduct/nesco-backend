// models/LatestNews.js
const mongoose = require("mongoose");

const LatestNewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_by: { type: String, required: true },
    comments: { type: [String], default: [] },
    shareable_url: { type: String, required: true },
    image:{type:String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("LatestNews", LatestNewsSchema);
