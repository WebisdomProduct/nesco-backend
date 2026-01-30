const mongoose = require("mongoose");
const sustainabilityBannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    paragraph1: {
        type: String,
    },
    paragraph2: {
        type: String,
    },
});
const SustainablilityBannerModel = mongoose.model("SustainablilityBanner" ,sustainabilityBannerSchema );
module.exports = SustainablilityBannerModel;
