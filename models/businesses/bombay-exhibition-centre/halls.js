const mongoose = require("mongoose");
const hallsSchema = new mongoose.Schema({
    pageName:{
        type:String,
    },
    title:{
        type:String,
    },
    image:{
        type:String,
    },
    alt:{
        type:String
    }
});
const hallsModel = mongoose.model("BusinessHalls" , hallsSchema);
module.exports = hallsModel;