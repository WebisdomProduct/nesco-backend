const mongoose = require("mongoose");

const secondSectionCsrBanner = new mongoose.Schema({
  paragraph1: { type: String },
  paragraph2: { type: String },
  paragraph3: { type: String }
});

const secondSectionCSRModel = mongoose.model(
  "CSRSecond",
  secondSectionCsrBanner
);

module.exports = secondSectionCSRModel;
