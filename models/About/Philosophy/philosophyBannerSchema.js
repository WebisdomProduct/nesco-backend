const mongoose = require("mongoose");

const philosophySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String, // S3 URL
    },
    video: {
      type: String // S3 URL OR external URL
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Philosophy", philosophySchema);
