const mongoose = require("mongoose");

const sustainabilityStakeholderSchema = new mongoose.Schema({
    mainTitle: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // image URL
        required: true
    }
});

module.exports = mongoose.model(
    "SustainabilityStakeholder",
    sustainabilityStakeholderSchema
);
