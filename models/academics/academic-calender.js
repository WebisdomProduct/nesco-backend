const mongoose = require('mongoose');

const AcademicCalendarSchema = new mongoose.Schema(
  {
    course_type: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    sharable_link: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AcademicCalendar', AcademicCalendarSchema);