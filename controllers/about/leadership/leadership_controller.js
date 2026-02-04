// controllers/about/leadership/leadership_controller.js

const LeadershipBanner = require("../../../models/About/LeaderShip/LeadershipbannerModel");
const uploadToS3 = require("../../../config/s3Uploader");

/* ================= CREATE ================= */
exports.createLeadershipBanner = async (req, res) => {
  try {
    const {
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      paragraph6,
    } = req.body;

    if (!req.files?.image) {
      return res.status(400).json({
        success: false,
        message: "Main image is required",
      });
    }
    let mobileImage = "";

    if (req.files?.mobileImage) {
      mobileImage = await uploadToS3(req.files.mobileImage[0], "leadership/banner");
    }

    // Upload images
    const imageUrl = await uploadToS3(
      req.files.image[0],
      "leadership/banner"
    );

    let featherImageUrl = "";
    if (req.files?.featherimage) {
      featherImageUrl = await uploadToS3(
        req.files.featherimage[0],
        "leadership/feather"
      );
    }

    const banner = await LeadershipBanner.create({
      image: imageUrl,
      featherimage: featherImageUrl,
      imageForMobile: mobileImage,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      paragraph6,
    });

    res.status(201).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= GET ALL ================= */
exports.getAllLeadershipBanners = async (req, res) => {
  try {
    const banners = await LeadershipBanner.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= GET ONE ================= */
exports.getLeadershipBannerById = async (req, res) => {
  try {
    const banner = await LeadershipBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= UPDATE ================= */
exports.updateLeadershipBanner = async (req, res) => {
  try {
    const updateData = {
      paragraph1: req.body.paragraph1,
      paragraph2: req.body.paragraph2,
      paragraph3: req.body.paragraph3,
      paragraph4: req.body.paragraph4,
      paragraph5: req.body.paragraph5,
      paragraph6: req.body.paragraph6,
    };

    if (req.files?.image) {
      updateData.image = await uploadToS3(
        req.files.image[0],
        "leadership/banner"
      );
    }
    if (req.files?.mobileImage) {
      updateData.imageForMobile = await uploadToS3(
        req.files.mobileImage[0],
        "leadership/banner"
      );
    }
    if (req.files?.featherimage) {
      updateData.featherimage = await uploadToS3(
        req.files.featherimage[0],
        "leadership/feather"
      );
    }

    const updated = await LeadershipBanner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    console.log(updated)

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= DELETE ================= */
exports.deleteLeadershipBanner = async (req, res) => {
  try {
    const deleted = await LeadershipBanner.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
