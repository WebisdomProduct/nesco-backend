const PassionModel = require("../../models/lifeAtnesco/passionModel");

/* ================= CREATE ================= */
exports.createPassion = async (req, res) => {
  try {
    const passion = new PassionModel(req.body);
    await passion.save();

    res.status(201).json({
      success: true,
      message: "Passion created successfully",
      data: passion
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= GET ALL ================= */
exports.getAllPassion = async (req, res) => {
  try {
    const data = await PassionModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= GET ONE ================= */
exports.getSinglePassion = async (req, res) => {
  try {
    const data = await PassionModel.findById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

/* ================= UPDATE ================= */
exports.updatePassion = async (req, res) => {
  try {
    const updated = await PassionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= DELETE ================= */
exports.deletePassion = async (req, res) => {
  try {
    await PassionModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
