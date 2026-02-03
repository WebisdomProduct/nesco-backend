const LifeVoiceModel = require("../../models/lifeAtnesco/LifeVoicesModel");
const uploadToS3 = require("../../config/s3Uploader");

/* ================= CREATE VOICE ================= */
/*
 Accepts:
 - videoUrl (string)  OR
 - video file (multipart/form-data)
*/
exports.createVoice = async (req, res) => {
  try {
    const { videoUrl, type } = req.body;

    let finalVideoUrl = "";

    // CASE 1: URL Provided
    if (videoUrl) {
      finalVideoUrl = videoUrl;
    }

    // CASE 2: File Uploaded
    if (req.file) {
      const uploadedUrl = await uploadToS3(req.file, "lifeVoices");
      finalVideoUrl = uploadedUrl;
    }

    if (!finalVideoUrl) {
      return res.status(400).json({
        success: false,
        message: "Provide video URL or upload a video file",
      });
    }

    const voice = await LifeVoiceModel.create({
      video: finalVideoUrl,
      type: type || "mp4",
    });

    res.status(201).json({
      success: true,
      data: voice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= GET ALL VOICES ================= */
exports.getAllVoices = async (req, res) => {
  try {
    const voices = await LifeVoiceModel.find();

    // Format like SliderData
    const formattedData = voices.map((item) => ({
      id:item._id,
      video: item.video,
      type: item.type,
    }));

    res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= GET SINGLE ================= */
exports.getVoiceById = async (req, res) => {
  try {
    const voice = await LifeVoiceModel.findById(req.params.id);

    if (!voice) {
      return res.status(404).json({
        success: false,
        message: "Voice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: voice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= UPDATE ================= */
exports.updateVoice = async (req, res) => {
  try {
    const { videoUrl, type } = req.body;

    let updateData = {};

    if (videoUrl) {
      updateData.video = videoUrl;
    }

    if (req.file) {
      const uploadedUrl = await uploadToS3(req.file, "lifeVoices");
      updateData.video = uploadedUrl;
    }

    if (type) {
      updateData.type = type;
    }

    const updatedVoice = await LifeVoiceModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedVoice) {
      return res.status(404).json({
        success: false,
        message: "Voice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedVoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= DELETE ================= */
exports.deleteVoice = async (req, res) => {
  try {
    console.log("Welcome to the dleet route")
    const deleted = await LifeVoiceModel.findByIdAndDelete(req.params.id);
    console.log(deleted)
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Voice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Voice deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
