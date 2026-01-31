const BombayBanner = require("../../../models/businesses/bombay-exhibition-centre/banner");
const uploadToS3 = require("../../../config/s3Uploader");

/* =====================================================
   CREATE BOMBAY BANNER
===================================================== */
exports.createBombayBanner = async (req, res) => {
  try {
    const { pageName } = req.body;

    if (!req.files || !req.files.image1 || !req.files.image2) {
      return res.status(400).json({
        message: "image1 and image2 are required"
      });
    }

    // Upload images to S3
    const image1Url = await uploadToS3(req.files.image1[0]);
    const image2Url = await uploadToS3(req.files.image2[0]);

    const banner = new BombayBanner({
      pageName,
      image1: image1Url,
      image2: image2Url
    });

    await banner.save();

    res.status(201).json({
      message: "Bombay banner created successfully",
      data: banner
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   GET ALL BANNERS
===================================================== */
exports.getAllBombayBanners = async (req, res) => {
  try {
    const banners = await BombayBanner.find();

    res.status(200).json({
      success: true,
      data: banners
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   GET BY PAGENAME
===================================================== */
exports.getBannerByPageName = async (req, res) => {
  try {
    const { pageName } = req.params;

    const banner = await BombayBanner.findOne({ pageName });

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({
      success: true,
      data: banner
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   UPDATE BANNER
===================================================== */
exports.updateBombayBanner = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = {
      pageName: req.body.pageName
    };

    if (req.files?.image1) {
      updateData.image1 = await uploadToS3(req.files.image1[0]);
    }

    if (req.files?.image2) {
      updateData.image2 = await uploadToS3(req.files.image2[0]);
    }

    const updatedBanner = await BombayBanner.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({
      message: "Banner updated successfully",
      data: updatedBanner
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   DELETE BANNER
===================================================== */
exports.deleteBombayBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await BombayBanner.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({
      message: "Banner deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
/* =====================================================
   GET BANNER BY PAGE NAME (PUBLIC API)
===================================================== */
exports.getBannerByPageNamePublic = async (req, res) => {
  try {
    const { pageName } = req.params;

    if (!pageName) {
      return res.status(400).json({
        message: "pageName is required"
      });
    }

    const banner = await BombayBanner.findOne({ pageName });

    if (!banner) {
      return res.status(404).json({
        message: "Banner not found"
      });
    }

    res.status(200).json({
      success: true,
      data: banner
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
