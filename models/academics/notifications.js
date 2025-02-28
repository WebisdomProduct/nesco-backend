const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    name: { type: String, required: true },
    shareable_link: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);