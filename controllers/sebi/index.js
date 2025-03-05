const Sebi = require("../../models/sebi/index.js");

module.exports.AddDetail = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(401).json({ msg: "All fields are required" });
    }

    const newDetail = new Sebi({
      title,
      description,
    });

    res.status(200).json({ msg: "Data added successfully", newDetail });
    await newDetail.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports.GetAllDetail = async (req, res) => {
  try {
    const details = await Sebi.find();
    res.status(200).json(details);
  } catch (err) {
    console.log(err);
  }
};

module.exports.GetIdDetail = async (req, res) => {
  try {
    const params = req.params.id;
    const detail = await Sebi.findById({ _id: params });
    if (!detail) {
      return res.status(401).json({ msg: "Data not found" });
    }
    res.status(200).json(detail);
  } catch (err) {
    console.log(err);
  }
};
module.exports.EditDetail = async (req, res) => {
  try {
    const params = req.params.id;

    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(401).json({ msg: "All fields are required" });
    }
    const newDetail = await Sebi.findByIdAndUpdate(
      { _id: params },
      {
        title,
        description,
      }
    );
    if (!newDetail) {
      return res.status(401).json({ msg: "Data not found" });
    }
    res.status(200).json(newDetail);
  } catch (err) {
    console.log(err);
  }
};

module.exports.DeleteDetail = async (req, res) => {
  try {
    const params = req.params.id;

    const detail = await Sebi.findByIdAndDelete({ _id: params });
    if (!detail) {
      return res.status(401).json({ msg: "Data not found" });
    }

    res.status(200).json(detail);
  } catch (err) {
    console.log(err);
  }
};
