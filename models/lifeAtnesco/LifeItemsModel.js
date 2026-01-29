const mongoose = require("mongoose");
const lifeItemsSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    heading:{
        type:String , 
        required:true
    },
    paragraph1:{
        type:String , 
        required:true,

    } , 
    paragraph2:{
        type:String ,
        required:true
    } , 
    sequenceNumber:{
        type:Number
    }
});
const lifeItemsModel = mongoose.model("LifeItems" , lifeItemsSchema)
module.exports = lifeItemsModel;