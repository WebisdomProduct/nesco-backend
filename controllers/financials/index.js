const financials = require("../../models/financials");

module.exports.AddFinancials = async (req, res) => {
  try {
    const { date, title, file, option, quater } = req.body;

    if (!date || !title || !file || !option) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!["annual", "financials", "subsidiary"].includes(option)) {
      return res.status(400).json({
        success: false,
        message: "Option should be either Annual, Financials, or Subsidiary",
      });
    }

    if (["financials"].includes(option) && quater) {
      if (![1, 2, 3, 4].includes(quater)) {
        return res.status(400).json({
          success: false,
          message: "Quarter should be between 1 and 4",
        });
      }

      const newDetail = new financials({ date, title, file, option, quater });
      await newDetail.save();

      res.status(201).json({
        success: true,
        message: "Financials Created Successfully!",
        data: newDetail,
      });
    } else {
      if (quater) {
        return res.status(400).json({
          success: false,
          message: "Quarter is not applicable in Annual and Subsidiary",
        });
      }

      const newDetail = new financials({ date, title, file, option });
      await newDetail.save();

      res.status(201).json({
        success: true,
        message: "Financials Created Successfully!",
        data: newDetail,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get All Financials
module.exports.GetFinancials = async (req, res) => {
  try {
    const newDetail = await financials.find();

    res.status(200).json({
      success: true,
      message: "Financials Fetched Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get Financials By Id
module.exports.GetFinancialsById = async (req, res) => {
  try {
    const params = req.params.id;

    const newDetail = await financials.findById({ _id: params });

    if (!newDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Data Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Financials Fetched Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Edit Financials
module.exports.EditFinancials = async (req, res) => {
  try {
    const params = req.params.id;
    const { date, title, file, option, quater } = req.body;

    if (!["annual", "financials", "subsidiary"].includes(option)) {
      return res.status(400).json({
        success: false,
        message: "Option should be either Annual, Financials, or Subsidiary",
      });
    }

    if (["financials"].includes(option) && quater) {
      if (![1, 2, 3, 4].includes(quater)) {
        return res.status(400).json({
          success: false,
          message: "Quarter should be between 1 and 4",
        });
      }

      const newDetail = await financials.findByIdAndUpdate(
        { _id: params },
        { date, title, file, option, quater },
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
        message: "Financials Edited Successfully!",
        data: newDetail,
      });
    } else {
      if (quater) {
        return res.status(400).json({
          success: false,
          message: "Quarter is not applicable in Annual and Subsidiary",
        });
      }
      let Detail = { date, title, file, option, quater };
      Detail.$unset = { quater: "" };

      const newDetail = await financials.findByIdAndUpdate(
        { _id: params },
        Detail,
        { new: true }
      );

      res.status(201).json({
        success: true,
        message: "Financials Edited Successfully!",
        data: newDetail,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// delete Financials By Id
module.exports.DeleteFinancialsById = async (req, res) => {
  try {
    const params = req.params.id;

    const newDetail = await financials.findByIdAndDelete({ _id: params });

    if (!newDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Data Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Financials Deleted Successfully!",
      data: newDetail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
