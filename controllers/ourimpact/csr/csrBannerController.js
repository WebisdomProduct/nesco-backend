const csrBannerModel = require("../../../models/OurImpact/csr/CsrBannerSchema");
const uploadToS3 = require("../../../config/s3Uploader");

// CREATE
exports.createCsrBanner = async (req, res) => {
  try {
    const { paragraph1, paragraph2 } = req.body;

    if (!paragraph1 || !paragraph2) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = await uploadToS3(req.file, "csrBanner");

    const banner = await csrBannerModel.create({
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
exports.getAllCsrBanners = async (req, res) => {
  try {
    const banners = await csrBannerModel.find();

    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET SINGLE
exports.getSingleCsrBanner = async (req, res) => {
  try {
    const banner = await csrBannerModel.findById(req.params.id);

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
exports.updateCsrBanner = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file, "csrBanner");
      updateData.image = imageUrl;
    }

    const updated = await csrBannerModel.findByIdAndUpdate(
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
exports.deleteCsrBanner = async (req, res) => {
  try {
    const deleted = await csrBannerModel.findByIdAndDelete(req.params.id);

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
