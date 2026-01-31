const BusinessFacilities = require("../../../models/businesses/bombay-exhibition-centre/facilities");
const uploadToS3 = require("../../../config/s3Uploader");

/* ============================================
   CREATE
============================================ */
exports.createFacility = async (req, res) => {
  try {
    const { pageName, name, description } = req.body;

    if (!pageName || !name) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const imageUrl = await uploadToS3(req.file, pageName);

    const facility = new BusinessFacilities({
      pageName,
      name,
      image: imageUrl,
      description
    });

    await facility.save();

    res.status(201).json({
      message: "Facility Created",
      data: facility
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   GET ALL (ADMIN)
============================================ */
exports.getAllFacilities = async (req, res) => {
  try {
    const data = await BusinessFacilities.find();

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
exports.getFacilitiesByPageName = async (req, res) => {
  try {
    const { pageName } = req.params;

    const data = await BusinessFacilities.find({ pageName });

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
exports.updateFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    let updateData = { name, description };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      updateData.image = imageUrl;
    }

    const updated = await BusinessFacilities.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Facility not found" });
    }

    res.status(200).json({
      message: "Facility Updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================
   DELETE
============================================ */
exports.deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await BusinessFacilities.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Facility not found" });
    }

    res.status(200).json({
      message: "Facility Deleted"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
