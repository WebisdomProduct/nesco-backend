const mongoose = require("mongoose");

const FeaturedAchievementsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    shareable_url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "FeaturedAchievements",
  FeaturedAchievementsSchema
);
