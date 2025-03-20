const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
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
    university: {
      type: String,
      require: true,
    },
    degree: {
      type: String,
      require: true,
    },
    expected_year: {
      type: String,
      require: true,
    },
    resumeFile: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", InternshipSchema);
