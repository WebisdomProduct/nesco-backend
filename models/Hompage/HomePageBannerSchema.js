const mongoose = require("mongoose");
const HomePageBannerSchema = new mongoose.Schema({
    image:{
        type:String,
        required:[true , "banner Image must be required"]
    },
    description:{
        type:String, 
        required:[true , "Banner desciption must be required"]
    },
    hexaImage:{
        type:String, 
        // required:[true , "hexaImage must be required"]
    },
    hexaLogo:{
        type:String , 
        // required:[true , "hexaLogo must be required"]
    }
});
const HomePageBannerModel = mongoose.model("HomePageBanner" , HomePageBannerSchema);
module.exports=HomePageBannerModel;