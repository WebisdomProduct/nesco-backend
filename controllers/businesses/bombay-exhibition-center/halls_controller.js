const Halls = require("../../../models/businesses/bombay-exhibition-centre/halls");
const uploadToS3 = require("../../../config/s3Uploader");

/* ============================================
   CREATE
============================================ */
exports.createHall = async (req, res) => {
  try {
    const { pageName, title, alt } = req.body;

    if (!pageName) {
      return res.status(400).json({ message: "pageName is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = await uploadToS3(req.file);

    const hall = new Halls({
      pageName,
      title,
      image: imageUrl,
      alt
    });

    await hall.save();

    res.status(201).json({
      message: "Hall Created Successfully",
      data: hall
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   GET ALL (ADMIN)
============================================ */
exports.getAllHalls = async (req, res) => {
  try {
    const data = await Halls.find();

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
exports.getHallsByPageName = async (req, res) => {
  try {
    const { pageName } = req.params;

    const data = await Halls.find({ pageName });

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
exports.updateHall = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, alt } = req.body;

    let updateData = { title, alt };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      updateData.image = imageUrl;
    }

    const updated = await Halls.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Hall not found" });
    }

    res.status(200).json({
      message: "Hall Updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   DELETE
============================================ */
exports.deleteHall = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Halls.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Hall not found" });
    }

    res.status(200).json({
      message: "Hall Deleted"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
