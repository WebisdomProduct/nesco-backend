const SustainabilityPractices = require("../../../models/OurImpact/sustainability/sustainability_pratices");
const uploadToS3 = require("../../../config/s3Uploader");

/* ================= CREATE ================= */
exports.createPractice = async (req, res) => {
  try {
    const { title, link, color, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to S3
    const imageUrl = await uploadToS3(req.file, "sustainability/practices");

    const practice = new SustainabilityPractices({
      image1: imageUrl,
      title,
      link,
      color,
      description,
    });

    await practice.save();

    res.status(201).json({
      success: true,
      message: "Practice created successfully",
      data: practice,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= GET ALL ================= */
exports.getAllPractices = async (req, res) => {
  try {
    const data = await SustainabilityPractices.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= GET SINGLE ================= */
exports.getSinglePractice = async (req, res) => {
  try {
    const data = await SustainabilityPractices.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ success: true, data });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= UPDATE ================= */
exports.updatePractice = async (req, res) => {
  try {
    const { title, link, color, description } = req.body;

    let updateData = {
      title,
      link,
      color,
      description,
    };

    // If new image uploaded → upload to S3
    if (req.file) {
      const imageUrl = await uploadToS3(req.file, "sustainability/practices");
      updateData.image1 = imageUrl;
    }

    const updated = await SustainabilityPractices.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= DELETE ================= */
exports.deletePractice = async (req, res) => {
  try {
    const deleted = await SustainabilityPractices.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
