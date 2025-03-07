const mongoose = require("mongoose");

const CornerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    file: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Corner", CornerSchema);
