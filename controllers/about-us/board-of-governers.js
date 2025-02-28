// controllers/boardOfGovernorsController.js
const BoardOfGoverners = require("../../models/about-us/board-of-governers");

exports.createGovernor = async (req, res) => {
  try {
    const { name, position, role, status } = req.body;
    const newGovernor = new BoardOfGoverners({ name, position, role, status });
    await newGovernor.save();
    res
      .status(201)
      .json({
        message: "Board of Governors member created successfully",
        data: newGovernor,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating governor", error });
  }
};

// controllers/boardOfGovernorsController.js
exports.getAllGovernors = async (req, res) => {
  try {
    const governors = await BoardOfGoverners.find();
    res
      .status(200)
      .json({ message: "All governors fetched successfully", data: governors });
  } catch (error) {
    res.status(500).json({ message: "Error fetching governors", error });
  }
};

// controllers/boardOfGovernorsController.js
exports.getGovernorById = async (req, res) => {
  try {
    const governor = await BoardOfGoverners.findById(req.params.id);
    if (!governor) {
      return res.status(404).json({ message: "Governor not found" });
    }
    res
      .status(200)
      .json({ message: "Governor fetched successfully", data: governor });
  } catch (error) {
    res.status(500).json({ message: "Error fetching governor", error });
  }
};

// controllers/boardOfGovernorsController.js
exports.updateGovernor = async (req, res) => {
  try {
    const { name, position, role, status } = req.body;
    const updatedGovernor = await BoardOfGoverners.findByIdAndUpdate(
      req.params.id,
      { name, position, role, status },
      { new: true } // Return the updated document
    );
    if (!updatedGovernor) {
      return res.status(404).json({ message: "Governor not found" });
    }
    res
      .status(200)
      .json({
        message: "Governor updated successfully",
        data: updatedGovernor,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating governor", error });
  }
};

// controllers/boardOfGovernorsController.js
exports.deleteGovernor = async (req, res) => {
  try {
    const deletedGovernor = await BoardOfGoverners.findByIdAndDelete(
      req.params.id
    );
    if (!deletedGovernor) {
      return res.status(404).json({ message: "Governor not found" });
    }
    res
      .status(200)
      .json({
        message: "Governor deleted successfully",
        data: deletedGovernor,
      });
  } catch (error) {
    res.status(500).json({ message: "Error deleting governor", error });
  }
};
