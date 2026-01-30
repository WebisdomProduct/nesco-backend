const mongoose = require("mongoose");
const sustainAbilityTextSchema = new mongoose.Schema({
    text:{type:String}
});
const sustainabilityTextModel = mongoose.model("SustainabilityTextModel" , sustainAbilityTextSchema);
module.exports = sustainabilityTextModel;