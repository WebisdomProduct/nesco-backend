const mongoose = require("mongoose");

const UnclaimedSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      require: true,
    },
    dividend: {
      type: Number,
      require: true,
    },
    unclaimedAmount: {
      type: Number,
      require: true,
    },
    lastDate: {
      type: Date,
      require: true,
    },
    dueDate: {
      type: Date,
      require: true,
    },
    file: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Unclaimed", UnclaimedSchema);
