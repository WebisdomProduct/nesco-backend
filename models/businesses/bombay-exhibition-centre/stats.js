const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const statsModel = mongoose.model("BusinessStats", statsSchema);
module.exports = statsModel;
