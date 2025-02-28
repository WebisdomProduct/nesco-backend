const mongoose = require('mongoose');

const SchoolOfDSUSchema = new mongoose.Schema(
  {
    type_name: { type: String, required: true }, 
    image: { type: String, required: true },
    social_media: [
      {
        type: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    courses: [
      {
        name: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('SchoolOfDSU', SchoolOfDSUSchema);