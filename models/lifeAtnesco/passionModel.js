const mongoose = require("mongoose");
const passionSchema = new mongoose.Schema({
    heading:{
        type:String,
    },
    paragraph1:{
        type:String
    },
    paragraph2:{
        type:String
    }
});
const PassionModel = mongoose.model("PassionLife" , passionSchema);
module.exports=PassionModel;