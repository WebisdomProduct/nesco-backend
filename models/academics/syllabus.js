// models/Syllabus.js
const mongoose = require("mongoose");

const SyllabusSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    course_type: { type: String, required: true },
    date: { type: Date, required: true },
    days: { type: String, required: true },
    event: { type: String, required: true },
    holiday_type: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Syllabus", SyllabusSchema);
