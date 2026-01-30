const CSRSecond = require("../../../models/OurImpact/csr/secondSectionSchema");

// CREATE
exports.createCSRSecond = async (req, res) => {
  try {
    const data = await CSRSecond.create(req.body);
    res.status(201).json({
      success: true,
      message: "Created successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// READ ALL
exports.getAllCSRSecond = async (req, res) => {
  try {
    const data = await CSRSecond.find().sort({ _id: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// READ ONE
exports.getSingleCSRSecond = async (req, res) => {
  try {
    const data = await CSRSecond.findById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE
exports.updateCSRSecond = async (req, res) => {
  try {
    const data = await CSRSecond.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Updated successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE
exports.deleteCSRSecond = async (req, res) => {
  try {
    await CSRSecond.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
