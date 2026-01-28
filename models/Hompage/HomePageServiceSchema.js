const mongoose = require("mongoose");
const homePageServiceSchema = new mongoose.Schema({
    image:{
        type:String , 
        required:[true , "Service image must be required"]
    },
    paragraph1:{
        type:String , required:[true , "Paragraph 1 must be required"]
    } ,
    paragraph2:{
        type:String , 
        required:[true, "Paragraph 2 must be required"]
    },
    explorebtnurl:{
        type:String , 
        required:[true , "Please provide home page url"]
    }
});
const homePageServiceModel = mongoose.model("HomePageService" , homePageServiceSchema);
module.exports = homePageServiceModel;