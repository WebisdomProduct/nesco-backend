const mongoose = require("mongoose");
const sustainabilityPracticesSchema = new mongoose.Schema({
    image1:{
        type:String
    },
    title:{
        type:String,
    },
    link:{
        type:String , 
        default:"",
    },
    color:{
        type:String 
    },
    description:{
        type:String
    }
});

module.exports = sustainabilityPracticesModel = mongoose.model("SustainabilityPractises" , sustainabilityPracticesSchema)