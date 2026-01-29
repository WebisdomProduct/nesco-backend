const LifeItemsModel = require("../../models/lifeAtnesco/LifeItemsModel");
const uploadToS3 = require("../../config/s3Uploader");

/* ================= CREATE ================= */
exports.createLifeItem = async (req, res) => {
  try {
    const { heading, paragraph1, paragraph2, sequenceNumber } = req.body;

    if (!heading || !paragraph1 || !paragraph2) {
      return res.status(400).json({
        success: false,
        message: "Heading, Paragraph1 and Paragraph2 are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageUrl = await uploadToS3(req.file, "lifeItems");

    const lifeItem = await LifeItemsModel.create({
      image: imageUrl,
      heading,
      paragraph1,
      paragraph2,
      sequenceNumber,
    });

    res.status(201).json({
      success: true,
      data: lifeItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET ALL (with optional sequence filter) ================= */
/*
 Example:
 GET /api/life-items
 GET /api/life-items?sequenceNumber=2
*/
exports.getAllLifeItems = async (req, res) => {
  try {
    let filter = {};

    if (req.query.sequenceNumber) {
      filter.sequenceNumber = Number(req.query.sequenceNumber);
    }

    const items = await LifeItemsModel.find(filter).sort({
      sequenceNumber: 1,
    });

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET SINGLE ================= */
exports.getLifeItemById = async (req, res) => {
  try {
    const item = await LifeItemsModel.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Life Item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= UPDATE ================= */
exports.updateLifeItem = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file, "lifeItems");
      updateData.image = imageUrl;
    }

    const updatedItem = await LifeItemsModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Life Item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= DELETE ================= */
exports.deleteLifeItem = async (req, res) => {
  try {
    const deletedItem = await LifeItemsModel.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Life Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Life Item deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
