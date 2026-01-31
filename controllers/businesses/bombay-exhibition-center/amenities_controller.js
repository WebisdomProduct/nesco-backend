const amenitiesModel = require("../../../models/businesses/bombay-exhibition-centre/amenties");
const uploadToS3 = require("../../../config/s3Uploader");

/* ============================================
   CREATE
============================================ */
exports.createAmenities = async (req, res) => {
  try {
    const { pageName, name, description } = req.body;

    if (!pageName || !name) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const imageUrl = await uploadToS3(req.file, pageName);

    const Amenities = new amenitiesModel({
      pageName,
      name,
      icon: imageUrl,
      description
    });

    await Amenities.save();

    res.status(201).json({
      message: "Amenities Created",
      data: Amenities
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   GET ALL (ADMIN)
============================================ */
exports.getAllAmenities = async (req, res) => {
  try {
    const data = await amenitiesModel.find();

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
exports.getAmenitiesByPageName = async (req, res) => {
  try {
    const { pageName } = req.params;

    const data = await amenitiesModel.find({ pageName });

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
exports.updateAmenities = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    let updateData = { name, description };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      updateData.icon = imageUrl;
    }

    const updated = await amenitiesModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Amenities not found" });
    }

    res.status(200).json({
      message: "Amenities Updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   DELETE
============================================ */
exports.deleteAmenities = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await amenitiesModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Amenities not found" });
    }

    res.status(200).json({
      message: "Amenities Deleted"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
