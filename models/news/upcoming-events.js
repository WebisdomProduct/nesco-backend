// models/UpcomingEvents.js
const mongoose = require("mongoose");

const UpcomingEventsSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    date_range: { type: [String],default:[]},
    description: { type: String, required: true },
    time: { type: String, required: true },
    organizer: { type: String, required: true },
    email: { type: String, required: true },
    event_type: { type: String, required: true },
    venue_type: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UpcomingEvents", UpcomingEventsSchema);
