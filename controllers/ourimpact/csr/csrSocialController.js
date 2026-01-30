const socialModel = require("../../../models/OurImpact/csr/socialSchema");
const uploadToS3 = require("../../../config/s3Uploader");


// ==============================
// CREATE SOCIAL ITEM
// ==============================
exports.createSocial = async (req, res) => {
  try {
    const {
      mainTitle,
      title1,
      title2,
      name,
      position,
      link,
      description,
      bImage // image link (optional)
    } = req.body;

    if (!mainTitle) {
      return res.status(400).json({
        message: "Main Title is required",
      });
    }

    let imageUrl = "";

    // If file uploaded → upload to S3
    if (req.file) {
      imageUrl = await uploadToS3(req.file, "social");
    }
    // If image link provided
    else if (bImage && bImage.trim()) {
      imageUrl = bImage;
    }

    const social = await socialModel.create({
      mainTitle,
      title1,
      title2,
      name,
      position,
      link,
      description,
      bImage: imageUrl,
    });

    res.status(201).json({
      success: true,
      data: social,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// ==============================
// GET ALL SOCIAL ITEMS
// ==============================
exports.getAllSocial = async (req, res) => {
  try {
    const socials = await socialModel.find();

    res.status(200).json({
      success: true,
      data: socials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// ==============================
// GET BY MAIN TITLE
// ==============================
exports.getSocialByMainTitle = async (req, res) => {
  try {
    const { mainTitle } = req.params;

    const socials = await socialModel.find({ mainTitle });

    res.status(200).json({
      success: true,
      data: socials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// ==============================
// GET SINGLE BY ID
// ==============================
exports.getSingleSocial = async (req, res) => {
  try {
    const social = await socialModel.findById(req.params.id);

    if (!social) {
      return res.status(404).json({
        message: "Social item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: social,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// ==============================
// UPDATE SOCIAL ITEM
// ==============================
exports.updateSocial = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // If new file uploaded
    if (req.file) {
      const imageUrl = await uploadToS3(req.file, "social");
      updateData.bImage = imageUrl;
    }

    // If new image link provided
    if (req.body.bImage && req.body.bImage.trim()) {
      updateData.bImage = req.body.bImage;
    }

    const updated = await socialModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Social item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// ==============================
// DELETE SOCIAL ITEM
// ==============================
exports.deleteSocial = async (req, res) => {
  try {
    const deleted = await socialModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Social item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Social item deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
