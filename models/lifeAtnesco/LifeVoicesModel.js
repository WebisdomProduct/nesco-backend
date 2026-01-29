const mongoose = require("mongoose");
const lifeVoicesSchema = new mongoose.Schema({
    video: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "mp4"
    }
});

const lifeVoiceModel = mongoose.model("Voices" , lifeVoicesSchema);
module.exports = lifeVoiceModel;