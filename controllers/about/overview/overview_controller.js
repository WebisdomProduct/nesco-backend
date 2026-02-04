const overviewbannerModel = require("../../../models/About/Overview/OverviewBannerSchema");
const uploadToS3 = require("../../../config/s3Uploader");

// ===================================
// CREATE BANNER
// ===================================
exports.createOverviewbanner = async (req, res) => {
  try {
    const { paragraph1, paragraph2, paragraph3, paragraph4 } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "Desktop image is required",
      });
    }

    // Upload Desktop Image
    const desktopImage = await uploadToS3(
      req.files.image[0],
      "overviewBanner"
    );

    // Upload Mobile Image (Optional)
    let mobileImage = "";
    if (req.files.mobileImage) {
      mobileImage = await uploadToS3(
        req.files.mobileImage[0],
        "overviewBanner"
      );
    }

    const banner = await overviewbannerModel.create({
      image: desktopImage,
      mobileImage: mobileImage,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
    });

    res.status(201).json({
      success: true,
      message: "Overview banner created",
      data: banner,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===================================
// GET ALL
// ===================================
exports.getAllOverviewBanners = async (req, res) => {
  try {
    const banners = await overviewbannerModel.find();

    res.status(200).json({
      success: true,
      data: banners,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===================================
// GET ONE
// ===================================
exports.getOverviewBanner = async (req, res) => {
  try {
    const banner = await overviewbannerModel.findById(req.params.id);

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
      message: "Server error",
    });
  }
};

// ===================================
// UPDATE
// ===================================
exports.updateOverviewBanner = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.files?.image) {
      const desktopImage = await uploadToS3(
        req.files.image[0],
        "overviewBanner"
      );
      updateData.image = desktopImage;
    }

    if (req.files?.mobileImage) {
      const mobileImage = await uploadToS3(
        req.files.mobileImage[0],
        "overviewBanner"
      );
      updateData.mobileImage = mobileImage;
    }

    const updatedBanner = await overviewbannerModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner updated",
      data: updatedBanner,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===================================
// DELETE
// ===================================
exports.deleteOverviewBanner = async (req, res) => {
  try {
    const deleted = await overviewbannerModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
