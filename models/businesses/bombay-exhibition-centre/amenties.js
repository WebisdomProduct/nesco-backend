const mongoose = require("mongoose");
const amenitiesSchema = new mongoose.Schema({
    pageName:{type:String},
    name:{type:String},
    icon:{type:String},
    description:{type:String}
});
const amenitiesModel = mongoose.model("BusinessAmenities" , amenitiesSchema);
module.exports = amenitiesModel;