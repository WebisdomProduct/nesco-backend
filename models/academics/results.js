const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    departments: [
      {
        department_name: { type: String, required: true },
        sharable_link: { type: String, required: true },
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', ResultSchema);