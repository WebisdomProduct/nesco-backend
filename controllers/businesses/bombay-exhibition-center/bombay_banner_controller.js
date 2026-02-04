const BombayBanner = require("../../../models/businesses/bombay-exhibition-centre/banner");
const uploadToS3 = require("../../../config/s3Uploader");

// ================= CREATE =================
exports.createBombayBanner = async (req, res) => {
  try {
    const { pageName } = req.body;

    let image1 = "";
    let image2 = "";
    let mobileImage = "";

    if (req.files?.image1) {
      image1 = await uploadToS3(req.files.image1[0], "bombay/banner");
    }

    if (req.files?.image2) {
      image2 = await uploadToS3(req.files.image2[0], "bombay/banner");
    }

    if (req.files?.mobileImage) {
      mobileImage = await uploadToS3(req.files.mobileImage[0], "bombay/banner");
    }

    const banner = await BombayBanner.create({
      pageName,
      image1,
      image2,
      mobileImage
    });

    res.status(201).json({
      success: true,
      data: banner
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Banner already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// ================= GET ALL =================
exports.getAllBombayBanners = async (req, res) => {
  const banners = await BombayBanner.find().sort({ createdAt: -1 });
  res.json({ success: true, data: banners });
};

// ================= GET BY PAGE =================
exports.getBannerByPageName = async (req, res) => {
  const banner = await BombayBanner.findOne({
    pageName: req.params.pageName
  });

  res.json({
    success: true,
    data: banner || null
  });
};

// ================= UPDATE =================
exports.updateBombayBanner = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.files?.image1) {
      updateData.image1 = await uploadToS3(
        req.files.image1[0],
        "bombay/banner"
      );
    }

    if (req.files?.image2) {
      updateData.image2 = await uploadToS3(
        req.files.image2[0],
        "bombay/banner"
      );
    }

    if (req.files?.mobileImage) {
      updateData.mobileImage = await uploadToS3(
        req.files.mobileImage[0],
        "bombay/banner"
      );
    }

    const updated = await BombayBanner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// ================= DELETE =================
exports.deleteBombayBanner = async (req, res) => {
  await BombayBanner.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
