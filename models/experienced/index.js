const mongoose = require("mongoose");

const ExperiencedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    mobile: {
      type: Number,
      require: true,
    },
    current_company: {
      type: String,
      require: true,
    },
    job_title: {
      type: String,
      require: true,
    },
    total_experienced: {
      type: Number,
      require: true,
    },
    resumeFile: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experienced", ExperiencedSchema);
