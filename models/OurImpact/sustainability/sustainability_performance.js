const mongoose = require("mongoose");
const sustainabilityPerformanceSchema = new mongoose.Schema({
    image:{
        type:String 
    } , 
    buttonText:{
        type:String
    },
    heading1:{
        type:String 
    },
    paragraph1:{
        type:String
    },
    paragraph2:{
        type:String
    }, 
    paragraph3:{
        type:String
    }
});

const sustainabilityPerformanceModel = mongoose.model("SustainabilityPerformance" , sustainabilityPerformanceSchema);
module.exports = sustainabilityPerformanceModel;