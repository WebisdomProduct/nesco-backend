// controllers/boardOfManagementController.js
const BoardOfManagment = require("../../models/about-us/board-of-managment");

exports.createManagementMember = async (req, res) => {
  try {
    const { name, position, role, status } = req.body;
    const newMember = new BoardOfManagment({ name, position, role, status });
    await newMember.save();
    res
      .status(201)
      .json({
        message: "Board of Management member created successfully",
        data: newMember,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating management member", error });
  }
};

// controllers/boardOfManagementController.js
exports.getAllManagementMembers = async (req, res) => {
  try {
    const members = await BoardOfManagment.find();
    res
      .status(200)
      .json({
        message: "All management members fetched successfully",
        data: members,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching management members", error });
  }
};

// controllers/boardOfManagementController.js
exports.getManagementMemberById = async (req, res) => {
  try {
    const member = await BoardOfManagment.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Management member not found" });
    }
    res
      .status(200)
      .json({
        message: "Management member fetched successfully",
        data: member,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching management member", error });
  }
};

// controllers/boardOfManagementController.js
exports.updateManagementMember = async (req, res) => {
  try {
    const { name, position, role, status } = req.body;
    const updatedMember = await BoardOfManagment.findByIdAndUpdate(
      req.params.id,
      { name, position, role, status },
      { new: true } // Return the updated document
    );
    if (!updatedMember) {
      return res.status(404).json({ message: "Management member not found" });
    }
    res
      .status(200)
      .json({
        message: "Management member updated successfully",
        data: updatedMember,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating management member", error });
  }
};

// controllers/boardOfManagementController.js
exports.deleteManagementMember = async (req, res) => {
  try {
    const deletedMember = await BoardOfManagment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedMember) {
      return res.status(404).json({ message: "Management member not found" });
    }
    res
      .status(200)
      .json({
        message: "Management member deleted successfully",
        data: deletedMember,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting management member", error });
  }
};
