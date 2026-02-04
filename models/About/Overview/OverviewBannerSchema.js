const mongoose = require("mongoose");
const overviewbannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    mobileImage:{
        type:String , 
    },
    paragraph1: {
        type: String,
    },
    paragraph2: {
        type: String,
    },
    paragraph3: {
        type: String,
    },
    paragraph4: {
        type: String,
    }
});
const overviewbannerModel = mongoose.model("OverviewBanner" ,overviewbannerSchema);
module.exports = overviewbannerModel;
