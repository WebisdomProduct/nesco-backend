// models/Program.js
const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  program_type: {
    program_type_title: { type: String, required: true },
    program_type_list: { type: [String], required: true }
  },
}, { timestamps: true });

module.exports = mongoose.model('AdmissionProgram', ProgramSchema);



