const mongoose = require("mongoose")

const LeadershipBannerSchema = new mongoose.Schema(
  {
    image:{type:String , required:[true , "Image must be required"]},
    imageForMobile:{type:String},
    featherimage:{type:String},
    paragraph1:{type:String},
    paragraph2:{type:String},
    paragraph3:{type:String},
    paragraph4:{type:String},
    paragraph5:{type:String},
    paragraph6:{type:String}    
  },
  { timestamps: true } 
);
const LeadershipBanner = mongoose.model("LeadershipBanner" , LeadershipBannerSchema);
module.exports=LeadershipBanner
