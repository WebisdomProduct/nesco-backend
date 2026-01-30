const SustainabilityFeature = require("../../../models/OurImpact/sustainability/sustainability_features");
const uploadToS3 = require("../../../config/s3Uploader");

// CREATE
exports.createFeature = async (req, res) => {
  try {
    const { title, description, bgColor } = req.body;

    if (!title || !description || !bgColor || !req.file) {
      return res.status(400).json({ message: "All fields required" });
    }

    const iconUrl = await uploadToS3(req.file);

    const feature = await SustainabilityFeature.create({
      title,
      description,
      bgColor,
      icon: iconUrl,
    });

    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL
exports.getAllFeatures = async (req, res) => {
  try {
    const data = await SustainabilityFeature.find().sort({ createdAt: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateFeature = async (req, res) => {
  try {
    const { title, description, bgColor } = req.body;

    let updateData = { title, description, bgColor };

    if (req.file) {
      const iconUrl = await uploadToS3(req.file);
      updateData.icon = iconUrl;
    }

    const updated = await SustainabilityFeature.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteFeature = async (req, res) => {
  try {
    await SustainabilityFeature.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
