// models/VideoHighlight.js
const mongoose = require('mongoose');

const VideoHighlightSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    video: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('VideoHighlight', VideoHighlightSchema);