// controllers/facultyController.js
const Faculty = require("../../models/about-us/faculty");

exports.createFacultyMember = async (req, res) => {
  try {
    const {
      name,
      profile_image,
      email,
      linkedin_url,
      twitter_link,
      facebook_link,
      instagram_link,
      status,
    } = req.body;
    const newFaculty = new Faculty({
      name,
      profile_image,
      email,
      linkedin_url,
      twitter_link,
      facebook_link,
      instagram_link,
      status,
    });
    await newFaculty.save();
    res
      .status(201)
      .json({
        message: "Faculty member created successfully",
        data: newFaculty,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating faculty member", error });
  }
};

// controllers/facultyController.js
exports.getAllFacultyMembers = async (req, res) => {
  try {
    const facultyMembers = await Faculty.find();
    res
      .status(200)
      .json({
        message: "All faculty members fetched successfully",
        data: facultyMembers,
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculty members", error });
  }
};

// controllers/facultyController.js
exports.getFacultyMemberById = async (req, res) => {
  try {
    const facultyMember = await Faculty.findById(req.params.id);
    if (!facultyMember) {
      return res.status(404).json({ message: "Faculty member not found" });
    }
    res
      .status(200)
      .json({
        message: "Faculty member fetched successfully",
        data: facultyMember,
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculty member", error });
  }
};

// controllers/facultyController.js
exports.updateFacultyMember = async (req, res) => {
  try {
    const {
      name,
      profile_image,
      email,
      linkedin_url,
      twitter_link,
      facebook_link,
      instagram_link,
      status,
    } = req.body;
    const updatedFacultyMember = await Faculty.findByIdAndUpdate(
      req.params.id,
      {
        name,
        profile_image,
        email,
        linkedin_url,
        twitter_link,
        facebook_link,
        instagram_link,
        status,
      },
      { new: true } // Return the updated document
    );
    if (!updatedFacultyMember) {
      return res.status(404).json({ message: "Faculty member not found" });
    }
    res
      .status(200)
      .json({
        message: "Faculty member updated successfully",
        data: updatedFacultyMember,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating faculty member", error });
  }
};

// controllers/facultyController.js
exports.deleteFacultyMember = async (req, res) => {
  try {
    const deletedFacultyMember = await Faculty.findByIdAndDelete(req.params.id);
    if (!deletedFacultyMember) {
      return res.status(404).json({ message: "Faculty member not found" });
    }
    res
      .status(200)
      .json({
        message: "Faculty member deleted successfully",
        data: deletedFacultyMember,
      });
  } catch (error) {
    res.status(500).json({ message: "Error deleting faculty member", error });
  }
};
