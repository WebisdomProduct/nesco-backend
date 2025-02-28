// models/Blog.js
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    cover_image: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);