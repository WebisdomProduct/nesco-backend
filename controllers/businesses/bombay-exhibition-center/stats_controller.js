const statsModel = require("../../../models/businesses/bombay-exhibition-centre/stats");
const uploadToS3 = require("../../../config/s3Uploader");

/* ============================================
   CREATE
============================================ */
exports.createStat = async (req, res) => {
  try {
    const { pageName, value, label } = req.body;

    if (!pageName || !value || !label) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Icon image required" });
    }

    // Upload to S3
    const uploadResult = await uploadToS3(req.file, pageName);
    // console.log(uploadResult)
    
    const stat = await statsModel.create({
      pageName,
      icon: uploadResult,
      value,
      label
    });

    res.status(201).json({
      message: "Stat Created",
      data: stat
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   GET ALL (ADMIN)
============================================ */
exports.getAllStats = async (req, res) => {
  try {
    const data = await statsModel.find();

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   GET BY PAGENAME (PUBLIC)
============================================ */
exports.getStatsByPageName = async (req, res) => {
  try {
    const { pageName } = req.params;

    const data = await statsModel.find({ pageName });

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   UPDATE
============================================ */
exports.updateStat = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, label } = req.body;

    let updateData = { value, label };

    if (req.file) {
      const uploadResult = await uploadToS3(req.file);
      updateData.icon = uploadResult;   // ✅ FIX
    }

    const updated = await statsModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Stat not found" });
    }

    res.status(200).json({
      message: "Stat Updated",
      data: updated
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   DELETE
============================================ */
exports.deleteStat = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await statsModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Stat not found" });
    }

    res.status(200).json({
      message: "Stat Deleted"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
