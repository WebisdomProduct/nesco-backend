const Result = require("../../models/academics/results");

exports.createResult = async (req, res) => {
  try {
    const { title, departments } = req.body;

    const newResult = new Result({
      title,
      departments,
    });

    await newResult.save();
    res
      .status(201)
      .json({ message: "Result created successfully", data: newResult });
  } catch (error) {
    res.status(500).json({ message: "Error creating result", error });
  }
};

exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find();
    res
      .status(200)
      .json({ message: "Results fetched successfully", data: results });
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error });
  }
};

exports.getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }
    res
      .status(200)
      .json({ message: "Result fetched successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error fetching result", error });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const { title, departments } = req.body;

    const updatedResult = await Result.findByIdAndUpdate(
      req.params.id,
      { title, departments },
      { new: true } // Return the updated document
    );

    if (!updatedResult) {
      return res.status(404).json({ message: "Result not found" });
    }

    res
      .status(200)
      .json({ message: "Result updated successfully", data: updatedResult });
  } catch (error) {
    res.status(500).json({ message: "Error updating result", error });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    const deletedResult = await Result.findByIdAndDelete(req.params.id);
    if (!deletedResult) {
      return res.status(404).json({ message: "Result not found" });
    }

    res
      .status(200)
      .json({ message: "Result deleted successfully", data: deletedResult });
  } catch (error) {
    res.status(500).json({ message: "Error deleting result", error });
  }
};
