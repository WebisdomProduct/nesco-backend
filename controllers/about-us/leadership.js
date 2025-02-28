// controllers/leadershipController.js
const Leadership = require("../../models/about-us/leadership");

exports.createLeadership = async (req, res) => {
  try {
    const { name, description,profile, status } = req.body;
    const newLeadership = new Leadership({
      name,
      description,
      status,
      profile
    });
    await newLeadership.save();
    res
      .status(201)
      .json({
        message: "Leadership created successfully",
        data: newLeadership,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating leadership", error });
  }
};

// controllers/leadershipController.js
exports.getAllLeaderships = async (req, res) => {
  try {
    const leaderships = await Leadership.find();
    res
      .status(200)
      .json({
        message: "All leadership records fetched successfully",
        data: leaderships,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching leadership records", error });
  }
};

// controllers/leadershipController.js
exports.getLeadershipById = async (req, res) => {
  try {
    const leadership = await Leadership.findById(req.params.id);
    if (!leadership) {
      return res.status(404).json({ message: "Leadership record not found" });
    }
    res
      .status(200)
      .json({
        message: "Leadership record fetched successfully",
        data: leadership,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching leadership record", error });
  }
};

// controllers/leadershipController.js
exports.updateLeadership = async (req, res) => {
  try {
    const { name, description,profile, status } = req.body;
    const updatedLeadership = await Leadership.findByIdAndUpdate(
      req.params.id,
      { name, description,profile, status },
      { new: true } // Return the updated document
    );
    if (!updatedLeadership) {
      return res.status(404).json({ message: "Leadership record not found" });
    }
    res
      .status(200)
      .json({
        message: "Leadership record updated successfully",
        data: updatedLeadership,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating leadership record", error });
  }
};

// controllers/leadershipController.js
exports.deleteLeadership = async (req, res) => {
  try {
    const deletedLeadership = await Leadership.findByIdAndDelete(req.params.id);
    if (!deletedLeadership) {
      return res.status(404).json({ message: "Leadership record not found" });
    }
    res
      .status(200)
      .json({
        message: "Leadership record deleted successfully",
        data: deletedLeadership,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting leadership record", error });
  }
};
