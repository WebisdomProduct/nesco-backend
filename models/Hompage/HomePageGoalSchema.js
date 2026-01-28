const mongoose = require("mongoose");
const goalSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "Please provide an image for the goal"]
    },
    heading1: {
        type: String,
        required: [true, "Heading 1 must be required"]
    },
    heading2: {
        type: String,
        required: [true, "Heading 2 must be required"]
    },
    heading3: {
        type: String,
        required: [true, "Heading 3 must be required"]
    },
    paragraphDescription:{
        type:String,
        required:[true , "Some description must be required"]
    }

});

const GoalModel = mongoose.model("HomePageGoal" , goalSchema);
module.exports = GoalModel;