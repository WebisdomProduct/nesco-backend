const SustainablilityBannerModel  = require("../../../models/OurImpact/sustainability/sustainability_banner");
const uploadToS3 = require("../../../config/s3Uploader");

// CREATE
exports.createSustainabilityBanner = async (req, res) => {
  try {
    const { paragraph1, paragraph2 } = req.body;

    if (!paragraph1 || !paragraph2) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = await uploadToS3(req.file, "csrBanner");

    const banner = await SustainablilityBannerModel .create({
      image: imageUrl,
      paragraph1,
      paragraph2,
    });

    res.status(201).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET ALL
exports.getAllSustainabilityBanners = async (req, res) => {
  try {
    const banners = await SustainablilityBannerModel .find();

    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET SINGLE
exports.getSingleSustainabilityBanner = async (req, res) => {
  try {
    const banner = await SustainablilityBannerModel .findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "CSR Banner not found" });
    }

    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE
exports.updateSustainabilityBanner = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file, "csrBanner");
      updateData.image = imageUrl;
    }

    const updated = await SustainablilityBannerModel .findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "CSR Banner not found" });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE
exports.deleteSustainabilityBanner = async (req, res) => {
  try {
    const deleted = await SustainablilityBannerModel .findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "CSR Banner not found" });
    }

    res.status(200).json({
      success: true,
      message: "CSR Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
