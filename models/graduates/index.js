const mongoose = require("mongoose");

const GraduatesSchema = new mongoose.Schema(
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
    graduation_year: {
      type: String,
      require: true,
    },
    degree: {
      type: String,
      require: true,
    },
    job_role: {
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

module.exports = mongoose.model("Graduates", GraduatesSchema);
