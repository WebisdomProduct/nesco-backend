const Philosophy = require("../../../models/About/Philosophy/philosophyBannerSchema");
const uploadToS3 = require("../../../config/s3Uploader");

/* ================= CREATE ================= */
exports.createPhilosophy = async (req, res) => {
  try {
    const { title, subtitle, description, videoUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required"
      });
    }

    // if (!req.files?.image) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Image is required"
    //   });
    // }

    // const imageUrl = await uploadToS3(req.files.image[0], "philosophy/image");

    // Video can be URL or file
    let finalVideo = "";
    if (req.files?.video) {
      finalVideo = await uploadToS3(req.files.video[0], "philosophy/video");
    } else if (videoUrl) {
      finalVideo = videoUrl;
    }

    const philosophy = await Philosophy.create({
      title,
      subtitle,
      description,
      video: finalVideo
    });

    res.status(201).json({
      success: true,
      data: philosophy
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET ALL ================= */
exports.getAllPhilosophy = async (req, res) => {
  try {
    const data = await Philosophy.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET ONE ================= */
exports.getPhilosophyById = async (req, res) => {
  try {
    const data = await Philosophy.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= UPDATE ================= */
exports.updatePhilosophy = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    let updateData = { ...req.body };

    if (req.files?.image) {
      updateData.image = await uploadToS3(req.files.image[0], "philosophy/image");
    }

    if (req.files?.video) {
      updateData.video = await uploadToS3(req.files.video[0], "philosophy/video");
    } else if (videoUrl) {
      updateData.video = videoUrl;
    }

    const updated = await Philosophy.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Philosophy not found" });
    }

    res.status(200).json({ success: true, data: updated });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= DELETE ================= */
exports.deletePhilosophy = async (req, res) => {
  try {
    const deleted = await Philosophy.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Philosophy not found" });
    }
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
