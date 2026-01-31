const BusinessDisplay = require("../../../models/businesses/bombay-exhibition-centre/display");
const uploadToS3 = require("../../../config/s3Uploader");

/* ============================================
   CREATE
============================================ */
exports.createDisplay = async (req, res) => {
  try {
    const { pageName, alt } = req.body;

    if (!pageName) {
      return res.status(400).json({ message: "pageName is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = await uploadToS3(req.file);

    const display = new BusinessDisplay({
      pageName,
      image: imageUrl,
      alt
    });

    await display.save();

    res.status(201).json({
      message: "Display Image Created",
      data: display
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   GET ALL (ADMIN)
============================================ */
exports.getAllDisplays = async (req, res) => {
  try {
    const data = await BusinessDisplay.find();

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
exports.getDisplaysByPageName = async (req, res) => {
  try {
    const { pageName } = req.params;

    const data = await BusinessDisplay.find({ pageName });

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
exports.updateDisplay = async (req, res) => {
  try {
    const { id } = req.params;
    const { alt } = req.body;

    let updateData = { alt };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      updateData.image = imageUrl;
    }

    const updated = await BusinessDisplay.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Display not found" });
    }

    res.status(200).json({
      message: "Display Updated",
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
exports.deleteDisplay = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await BusinessDisplay.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Display not found" });
    }

    res.status(200).json({
      message: "Display Deleted"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
