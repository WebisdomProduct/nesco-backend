// models/newsModel.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['normal', 'stock', 'annual'],
      required: true,
    },
    title: { type: String },
    title2: String,
    description: String,
    backgroundColor: { type: String, default: '#ffffff' },
    color: { type: String, default: '#000000' },
    imageUrl: String,
    arrowColor: String,
    isExternal: { type: Boolean, default: false },
    href: String,
    file: String,
    downloadColor: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema);
