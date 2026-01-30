const mongoose = require("mongoose");

const sustainabilityFeatureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String, // S3 / Cloudinary URL
      required: true,
    },
    bgColor: {
      type: String, // example: #eeeed4
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "SustainabilityFeature",
  sustainabilityFeatureSchema
);
