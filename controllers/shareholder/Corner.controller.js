const Corner = require("../../models/shareholder/corner.model");

module.exports.AddCorner = async (req, res) => {
  try {
    const { name, file } = req.body;

    if (!name || !file) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newDetail = new Corner({ name, file });
    await newDetail.save();

    res.status(201).json({
      success: true,
      message: "Corner Created Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.GetCorner = async (req, res) => {
  try {
    const newDetail = await Corner.find();

    res.status(200).json({
      success: true,
      message: "Corner Fetched Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get Corner By Id
module.exports.GetCornerById = async (req, res) => {
  try {
    const params = req.params.id;

    const newDetail = await Corner.findById({ _id: params });

    if (!newDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Data Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Corner Fetched Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Edit Corner
module.exports.EditCorner = async (req, res) => {
  try {
    const params = req.params.id;
    const { name, file } = req.body;

    const newDetail = await Corner.findByIdAndUpdate(
      { _id: params },
      { name, file },
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
      message: "Corner Edited Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// delete Corner By Id
module.exports.DeleteCornerById = async (req, res) => {
  try {
    const params = req.params.id;

    const newDetail = await Corner.findByIdAndDelete({ _id: params });

    if (!newDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Data Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Corner Deleted Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
