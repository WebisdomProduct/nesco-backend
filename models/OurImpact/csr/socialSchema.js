const mongoose = require("mongoose");
const socialSchema = new mongoose.Schema({
    mainTitle:{
        type:String , 
    } , 
    title1:{
        type:String
    } , 
    title2:{
        type:String
    } ,
    name:{
        type:String,
    } , 
    position:{
        type:String ,
    } , 
    link:{
        type:String , 
        default:""
    },
    bImage:{
        type:String , 
    } , 
    description:{
        type:String
    }
});

const socialModel = mongoose.model("SocialModel" , socialSchema);
module.exports = socialModel;