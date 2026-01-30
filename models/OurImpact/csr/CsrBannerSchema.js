const mongoose = require("mongoose");
const csrBannerSchema = new mongoose.Schema({
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
const csrBannerModel = mongoose.model("CSRBanner" ,csrBannerSchema);
module.exports = csrBannerModel;
