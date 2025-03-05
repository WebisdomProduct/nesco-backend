const mongoose = require("mongoose");

const financialsSchema = new mongoose.Schema({
  option: {
    type: String,
    enum: ["financials", "annual", "subsidiary"],
    default: "financials",
  },
  quater: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
  date: {
    type: Date,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  file: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Financials", financialsSchema);
