const LifeAtNescoBannerModel = require(
  "../../models/lifeAtnesco/lifeAtNescoBanner"
);

const uploadToS3 = require("../../config/s3Uploader");

/* ================= CREATE ================= */
exports.createLifeAtNescobanner = async (req, res) => {
  try {
    const {
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4
    } = req.body;

    if (!req.files?.image) {
      return res.status(400).json({
        message: "Desktop image is required"
      });
    }

    const imageUrl = await uploadToS3(
      req.files.image[0],
      "lifeAtNescoBanner"
    );

    let mobileImageUrl = "";
    if (req.files.mobileImage) {
      mobileImageUrl = await uploadToS3(
        req.files.mobileImage[0],
        "lifeAtNescoBanner/mobile"
      );
    }

    const banner = await LifeAtNescoBannerModel.create({
      image: imageUrl,
      mobileImage: mobileImageUrl,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4
    });

    res.status(201).json({
      success: true,
      data: banner
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET ALL ================= */
exports.getAllLifeAtNescoBanners = async (req, res) => {
  try {
    const banners = await LifeAtNescoBannerModel.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: banners
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET SINGLE ================= */
exports.getLifeAtNescoBanner = async (req, res) => {
  try {
    const banner = await LifeAtNescoBannerModel.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Life At Nesco Banner not found"
      });
    }

    res.status(200).json({
      success: true,
      data: banner
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= UPDATE ================= */
exports.updateLifeAtNescoBanner = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.files?.image) {
      const imageUrl = await uploadToS3(
        req.files.image[0],
        "lifeAtNescoBanner"
      );
      updateData.image = imageUrl;
    }

    if (req.files?.mobileImage) {
      const mobileUrl = await uploadToS3(
        req.files.mobileImage[0],
        "lifeAtNescoBanner/mobile"
      );
      updateData.mobileImage = mobileUrl;
    }

    const updatedBanner =
      await LifeAtNescoBannerModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: "Life At Nesco Banner not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedBanner
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= DELETE ================= */
exports.deleteLifeAtNescoBanner = async (req, res) => {
  try {
    const deleted =
      await LifeAtNescoBannerModel.findByIdAndDelete(
        req.params.id
      );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Life At Nesco Banner not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Life At Nesco Banner deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
