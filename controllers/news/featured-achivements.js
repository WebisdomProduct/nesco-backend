// controllers/featuredAchievementsController.js
const FeaturedAchievements = require("../../models/news/featured-achivements");

exports.createAchievement = async (req, res) => {
  try {
    const { title, description, shareable_url } = req.body;

    const newAchievement = new FeaturedAchievements({
      title,
      description,
      shareable_url,
    });

    await newAchievement.save();
    res
      .status(201)
      .json({
        message: "Achievement created successfully",
        data: newAchievement,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating achievement", error });
  }
};

exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await FeaturedAchievements.find();
    res
      .status(200)
      .json({
        message: "Achievements fetched successfully",
        data: achievements,
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching achievements", error });
  }
};

exports.getAchievementById = async (req, res) => {
  try {
    const achievement = await FeaturedAchievements.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res
      .status(200)
      .json({ message: "Achievement fetched successfully", data: achievement });
  } catch (error) {
    res.status(500).json({ message: "Error fetching achievement", error });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const { title, description, shareable_url } = req.body;

    const updatedAchievement = await FeaturedAchievements.findByIdAndUpdate(
      req.params.id,
      { title, description, shareable_url },
      { new: true } // Return the updated document
    );

    if (!updatedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res
      .status(200)
      .json({
        message: "Achievement updated successfully",
        data: updatedAchievement,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating achievement", error });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const deletedAchievement = await FeaturedAchievements.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res
      .status(200)
      .json({
        message: "Achievement deleted successfully",
        data: deletedAchievement,
      });
  } catch (error) {
    res.status(500).json({ message: "Error deleting achievement", error });
  }
};
