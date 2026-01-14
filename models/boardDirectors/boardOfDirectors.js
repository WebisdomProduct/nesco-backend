const mongoose = require("mongoose");
const boardOfDirectorsSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    description:[String]
});

const Directors = mongoose.model("Directors", boardOfDirectorsSchema);
module.exports = Directors;