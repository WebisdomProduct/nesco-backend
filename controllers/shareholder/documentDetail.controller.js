const DocumentDetail = require("../../models/shareholder/documentDetail.model");

module.exports.AddDocumentDetail = async (req, res) => {
  try {
    const { title, file } = req.body;

    if (!title || !file) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newDetail = new DocumentDetail({ title, file });
    await newDetail.save();

    res.status(201).json({
      success: true,
      message: "DocumentDetail Created Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.GetDocumentDetail = async (req, res) => {
  try {
    const newDetail = await DocumentDetail.find();

    res.status(200).json({
      success: true,
      message: "DocumentDetail Fetched Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get DocumentDetail By Id
module.exports.GetDocumentDetailById = async (req, res) => {
  try {
    const params = req.params.id;

    const newDetail = await DocumentDetail.findById({ _id: params });

    if (!newDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Data Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "DocumentDetail Fetched Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Edit DocumentDetail
module.exports.EditDocumentDetail = async (req, res) => {
  try {
    const params = req.params.id;
    const { title, file } = req.body;

    const newDetail = await DocumentDetail.findByIdAndUpdate(
      { _id: params },
      { title, file },
      { new: true }
    );
    if (!newDetail) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }

    res.status(201).json({
      success: true,
      message: "DocumentDetail Edited Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// delete DocumentDetail By Id
module.exports.DeleteDocumentDetailById = async (req, res) => {
  try {
    const params = req.params.id;

    const newDetail = await DocumentDetail.findByIdAndDelete({ _id: params });

    if (!newDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Data Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "DocumentDetail Deleted Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
