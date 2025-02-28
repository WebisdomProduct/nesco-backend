// controllers/upcomingEventsController.js
const UpcomingEvents = require("../../models/news/upcoming-events");

exports.createEvent = async (req, res) => {
  try {
    const {
      category,
      title,
      date_range,
      description,
      time,
      organizer,
      email,
      event_type,
      venue_type,
      image,
    } = req.body;

    const newEvent = new UpcomingEvents({
      category,
      title,
      date_range,
      description,
      time,
      organizer,
      email,
      event_type,
      venue_type,
      image,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", data: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await UpcomingEvents.find().sort({ date_range: 1 }); // Sorting by date_range
    res
      .status(200)
      .json({ message: "Events fetched successfully", data: events });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await UpcomingEvents.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res
      .status(200)
      .json({ message: "Event fetched successfully", data: event });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const {
      category,
      title,
      date_range,
      description,
      time,
      organizer,
      email,
      event_type,
      venue_type,
      image,
    } = req.body;

    const updatedEvent = await UpcomingEvents.findByIdAndUpdate(
      req.params.id,
      {
        category,
        title,
        date_range,
        description,
        time,
        organizer,
        email,
        event_type,
        venue_type,
        image,
      },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", data: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await UpcomingEvents.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event deleted successfully", data: deletedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
