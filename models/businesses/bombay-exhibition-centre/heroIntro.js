const mongoose = require("mongoose");
const heroIntroSchema = new mongoose.Schema({
    pageName:{
        type:String,
    },
    heading1:{
        type:String
    },
    paragraph:[
        {
            type:String
        }
    ]
});
const heroIntroModel = mongoose.model("BussinessheroIntro" ,heroIntroSchema );
module.exports = heroIntroModel;