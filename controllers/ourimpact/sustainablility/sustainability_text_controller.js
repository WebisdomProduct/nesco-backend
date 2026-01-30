const SustainabilityTextModel = require("../../../models/OurImpact/sustainability/sustainablility_text");

/* CREATE */
exports.createText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const newText = new SustainabilityTextModel({ text });
    await newText.save();

    res.status(201).json({
      success: true,
      message: "Text created successfully",
      data: newText
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* READ */
exports.getText = async (req, res) => {
  try {
    const data = await SustainabilityTextModel.findOne();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE */
exports.updateText = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const updated = await SustainabilityTextModel.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
exports.deleteText = async (req, res) => {
  try {
    await SustainabilityTextModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
