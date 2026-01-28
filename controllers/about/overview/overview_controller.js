const overviewbannerModel = require("../../../models/About/Overview/OverviewBannerSchema");
const uploadToS3 = require("../../../config/s3Uploader"); // adjust path if needed



exports.createOverviewbanner = async (req, res) => {
  try {
    const { paragraph1, paragraph2, paragraph3, paragraph4 } = req.body;

    if (!paragraph1 || !paragraph2 || !paragraph3 || !paragraph4) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = await uploadToS3(req.file, "overviewBanner");

    const banner = await overviewbannerModel.create({
      image: imageUrl,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
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



exports.getAllOverviewBanners = async (req, res) => {
  try {
    const banners = await overviewbannerModel.find();

    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


exports.getOverviewBanner = async (req, res) => {
  try {
    const banner = await overviewbannerModel.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Overview Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



exports.updateOverviewBanner = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // If new image uploaded
    if (req.file) {
      const imageUrl = await uploadToS3(req.file, "overviewBanner");
      updateData.image = imageUrl;
    }

    const updatedBanner = await overviewbannerModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: "Overview Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedBanner,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



exports.deleteOverviewBanner = async (req, res) => {
  try {
    const deletedBanner = await overviewbannerModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedBanner) {
      return res.status(404).json({
        success: false,
        message: "Overview Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Overview Banner deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
