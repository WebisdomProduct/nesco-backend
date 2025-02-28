const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rules: [
      {
        name: { type: String, required: true },
        order: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('RulesAndRegulations', RuleSchema);