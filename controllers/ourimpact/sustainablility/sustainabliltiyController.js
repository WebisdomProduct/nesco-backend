const sustainablilityBannerModel = require(
  "../../../models/OurImpact/sustainability/sustainability_banner"
);

const uploadToS3 = require("../../../config/s3Uploader");

/* ================= CREATE ================= */
exports.createsustainablilityBanner = async (req, res) => {
  try {
    const { paragraph1, paragraph2 } = req.body;

    if (!req.files?.image) {
      return res.status(400).json({ message: "Desktop image is required" });
    }

    const imageUrl = await uploadToS3(
      req.files.image[0],
      "sustainablilityBanner"
    );

    let mobileImageUrl = "";
    if (req.files.mobileImage) {
      mobileImageUrl = await uploadToS3(
        req.files.mobileImage[0],
        "sustainablilityBanner/mobile"
      );
    }

    const banner = await sustainablilityBannerModel.create({
      image: imageUrl,
      mobileImage: mobileImageUrl,
      paragraph1,
      paragraph2,
    });

    res.status(201).json({
      success: true,
      data: banner,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET ALL ================= */
exports.getAllsustainablilityBanners = async (req, res) => {
  try {
    const banners = await sustainablilityBannerModel.find().sort({ createdAt: -1 });
    console.log("gettting he banners")
    console.log(banners);
    res.status(200).json({
      success: true,
      data: banners,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET SINGLE ================= */
exports.getSinglesustainablilityBanner = async (req, res) => {
  try {
    const banner = await sustainablilityBannerModel.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "sustainablility Banner not found" });
    }

    res.status(200).json({
      success: true,
      data: banner,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= UPDATE ================= */
exports.updatesustainablilityBanner = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.files?.image) {
      const imageUrl = await uploadToS3(
        req.files.image[0],
        "sustainablilityBanner"
      );
      updateData.image = imageUrl;
    }

    if (req.files?.mobileImage) {
      const mobileUrl = await uploadToS3(
        req.files.mobileImage[0],
        "sustainablilityBanner/mobile"
      );
      updateData.mobileImage = mobileUrl;
    }

    const updated = await sustainablilityBannerModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "sustainablility Banner not found" });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= DELETE ================= */
exports.deletesustainablilityBanner = async (req, res) => {
  try {
    const deleted = await sustainablilityBannerModel.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({ message: "sustainablility Banner not found" });
    }

    res.status(200).json({
      success: true,
      message: "sustainablility Banner deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
