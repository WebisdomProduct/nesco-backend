const mongoose = require("mongoose");
const bombayBannerSchema = new mongoose.Schema({
    pageName:{type:String},
    image1:{type:String},
    image2:{type:String}
});
const bombayBannerModel = mongoose.model("BombayBanner", bombayBannerSchema);
module.exports = bombayBannerModel;
