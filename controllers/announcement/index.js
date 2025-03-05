const announcements = require("../../models/announcements/index.js");

module.exports.AddAnnounce = async (req, res) => {
  try {
    const { title, date, file } = req.body;

    if (!title || !date || !file) {
      return res
        .status(401)
        .json({ success: false, message: "All fields are required" });
    }

    const newDetail = new announcements({
      title,
      date,
      file,
    });

    res
      .status(200)
      .json({ success: true, message: "Data added successfully", newDetail });
    await newDetail.save();
  } catch (err) {
    console.log(err);
  }
};

// get all Announcements
module.exports.GetAnnounce = async (req, res) => {
  try {
    const newDetail = await announcements.find();

    res
      .status(200)
      .json({ success: true, message: "Fetched Data Successfully", newDetail });
  } catch (err) {
    console.log(err);
  }
};

// Get Announcements By Id
module.exports.GetAnnounceByID = async (req, res) => {
  try {
    const params = req.params.id;

    const newDetail = await announcements.findById({ _id: params });

    if (!newDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Fetched Data Successfully", newDetail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Edit Announcemets By ID
module.exports.EditAnnounce = async (req, res) => {
  try {
    const params = req.params.id;
    const { title, date, file } = req.body;
    const newDetail = await announcements.findByIdAndUpdate(
      { _id: params },
      {
        title,
        date,
        file,
      },
      { new: true }
    );
    if (!newDetail) {
      return res.status(401).json({ message: "Data not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Announcement updated successfully",
      newDetail,
    });
  } catch (err) {
    console.log(err);
  }
};

//Delete Announcemets
module.exports.DeleteAnnounce = async (req, res) => {
  try {
    const params = req.params.id;

    const newDetail = await announcements.findByIdAndDelete({ _id: params });
    if (!newDetail) {
      return res
        .status(401)
        .json({ success: false, message: "Data not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Announcement Deleted successfully",
      newDetail,
    });
  } catch (err) {
    console.log(err);
  }
};
