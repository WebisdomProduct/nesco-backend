const mongoose = require("mongoose");
const facilitiesSchema = new mongoose.Schema({
    pageName:{type:String},
    name:{type:String},
    image:{type:String},
    description:{type:String}
});
const facilitiesModel = mongoose.model("BusinessFacilities" , facilitiesSchema);
module.exports = facilitiesModel;