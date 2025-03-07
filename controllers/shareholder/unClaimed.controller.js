const Unclaimed = require("../../models/shareholder/unclaimed.model.js");

module.exports.AddUnclaimed = async (req, res) => {
  try {
    const { year, dividend, file, unclaimedAmount, lastDate, dueDate } =
      req.body;

    if (
      !year ||
      !dividend ||
      !file ||
      !unclaimedAmount ||
      !lastDate ||
      !dueDate
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newDetail = new Unclaimed({
      year,
      dividend,
      file,
      unclaimedAmount,
      lastDate,
      dueDate,
    });
    await newDetail.save();

    res.status(201).json({
      success: true,
      message: "Unclaimed Created Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get All Unclaimed
module.exports.GetUnclaimed = async (req, res) => {
  try {
    const newDetail = await Unclaimed.find();

    res.status(200).json({
      success: true,
      message: "Unclaimed Fetched Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get Unclaimed By Id
module.exports.GetUnclaimedById = async (req, res) => {
  try {
    const params = req.params.id;

    const newDetail = await Unclaimed.findById({ _id: params });

    if (!newDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Data Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Unclaimed Fetched Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Edit Unclaimed
module.exports.EditUnclaimed = async (req, res) => {
  try {
    const params = req.params.id;
    const { year, dividend, file, unclaimedAmount, lastDate, dueDate } =
      req.body;

    const newDetail = await Unclaimed.findByIdAndUpdate(
      { _id: params },
      { year, dividend, file, unclaimedAmount, lastDate, dueDate },
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
      message: "Unclaimed Edited Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// delete Unclaimed By Id
module.exports.DeleteUnclaimedById = async (req, res) => {
  try {
    const params = req.params.id;

    const newDetail = await Unclaimed.findByIdAndDelete({ _id: params });

    if (!newDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Data Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Unclaimed Deleted Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
