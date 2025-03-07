const mongoose = require("mongoose");

const DocumentDetailSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DocumentDetail", DocumentDetailSchema);
