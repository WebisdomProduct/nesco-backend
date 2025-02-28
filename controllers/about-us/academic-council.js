// controllers/academicCouncilController.js
const AcademicCouncil = require("../../models/about-us/academic-council");

exports.createCouncilMember = async (req, res) => {
  try {
    const { name, position, role, status } = req.body;
    const newMember = new AcademicCouncil({ name, position, role, status });
    await newMember.save();
    res
      .status(201)
      .json({
        message: "Academic Council member created successfully",
        data: newMember,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating council member", error });
  }
};

// controllers/academicCouncilController.js
exports.getAllCouncilMembers = async (req, res) => {
  try {
    const members = await AcademicCouncil.find();
    res
      .status(200)
      .json({
        message: "All council members fetched successfully",
        data: members,
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching council members", error });
  }
};

// controllers/academicCouncilController.js
exports.getCouncilMemberById = async (req, res) => {
  try {
    const member = await AcademicCouncil.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Council member not found" });
    }
    res
      .status(200)
      .json({ message: "Council member fetched successfully", data: member });
  } catch (error) {
    res.status(500).json({ message: "Error fetching council member", error });
  }
};

// controllers/academicCouncilController.js
exports.updateCouncilMember = async (req, res) => {
  try {
    const { name, position, role, status } = req.body;
    const updatedMember = await AcademicCouncil.findByIdAndUpdate(
      req.params.id,
      { name, position, role, status },
      { new: true } // Return the updated document
    );
    if (!updatedMember) {
      return res.status(404).json({ message: "Council member not found" });
    }
    res
      .status(200)
      .json({
        message: "Council member updated successfully",
        data: updatedMember,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating council member", error });
  }
};

// controllers/academicCouncilController.js
exports.deleteCouncilMember = async (req, res) => {
  try {
    const deletedMember = await AcademicCouncil.findByIdAndDelete(
      req.params.id
    );
    if (!deletedMember) {
      return res.status(404).json({ message: "Council member not found" });
    }
    res
      .status(200)
      .json({
        message: "Council member deleted successfully",
        data: deletedMember,
      });
  } catch (error) {
    res.status(500).json({ message: "Error deleting council member", error });
  }
};
