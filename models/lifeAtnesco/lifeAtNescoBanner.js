const mongoose = require("mongoose");
const lifeAtNescobannerSchema = new mongoose.Schema({
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
    paragraph3: {
        type: String,
    },
    paragraph4: {
        type: String,
    }
});
const LifeAtNescoBannerModel = mongoose.model("LifeAtNescoBanner" ,lifeAtNescobannerSchema);
module.exports = LifeAtNescoBannerModel;
