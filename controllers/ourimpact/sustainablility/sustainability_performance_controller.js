const SustainabilityPerformance = require("../../../models/OurImpact/sustainability/sustainability_performance");
const uploadToS3 = require("../../../config/s3Uploader");

/* ================= CREATE ================= */
exports.createPerformance = async (req, res) => {
  try {
    const { mainTitle, buttonText, heading1, paragraph1, paragraph2, paragraph3 } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload to S3
    const imageUrl = await uploadToS3(req.file);

    const performance = new SustainabilityPerformance({
      mainTitle,
      image: imageUrl,   // ✅ S3 URL
      buttonText,
      heading1,
      paragraph1,
      paragraph2,
      paragraph3
    });

    await performance.save();

    res.status(201).json({
      success: true,
      message: "Created successfully",
      data: performance
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= READ (ALL) ================= */
exports.getPerformance = async (req, res) => {
  try {
    const data = await SustainabilityPerformance.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= UPDATE ================= */
exports.updatePerformance = async (req, res) => {
  try {
    const updateData = {
      mainTitle: req.body.mainTitle,
      buttonText: req.body.buttonText,
      heading1: req.body.heading1,
      paragraph1: req.body.paragraph1,
      paragraph2: req.body.paragraph2,
      paragraph3: req.body.paragraph3
    };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);   // ✅ upload again
      updateData.image = imageUrl;
    }

    const updated = await SustainabilityPerformance.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updated
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= DELETE ================= */
exports.deletePerformance = async (req, res) => {
  try {
    await SustainabilityPerformance.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= READ BY MAIN TITLE ================= */
exports.getPerformanceByMainTitle = async (req, res) => {
  try {
    const { mainTitle } = req.params;

    if (!mainTitle) {
      return res.status(400).json({ message: "mainTitle is required" });
    }

    const data = await SustainabilityPerformance.findOne({ mainTitle });

    if (!data) {
      return res.status(404).json({ message: "Performance not found" });
    }

    res.status(200).json({
      success: true,
      message: "Fetched successfully",
      data
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
