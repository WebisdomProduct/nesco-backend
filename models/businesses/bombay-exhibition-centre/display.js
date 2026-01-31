const mongoose = require("mongoose");
const displaySchema = new mongoose.Schema({
    image:{type:String},
    alt:{type:String},
    pageName:{type:String}
});
const businessDisplayModel = mongoose.model("BusinessDisplayModel" , displaySchema);
module.exports = businessDisplayModel;