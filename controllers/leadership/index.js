const Leadership = require("../../models/leadership");

module.exports.AddLeadership = async (req, res) => {
  try {
    const { name, position, image, description } = req.body;

    if (!name || !position || !image || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }

    const newDetail = new Leadership({
      name,
      position,
      image,
      description,
    });

    await newDetail.save();

    res.status(201).json({
      success: true,
      message: "Leader Created Successfully",
      data: newDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports.GetAllLeadership = async (req, res) => {
  try {
    const getDetail = await Leadership.find();
    res.status(200).json({
      success: true,
      message: "Leaderships Retrieved Successfully",
      data: getDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports.GetLeadershipById = async (req, res) => {
  try {
    const { id } = req.params;
    const getDetail = await Leadership.findById(id);

    if (!getDetail) {
      return res.status(404).json({
        success: false,
        message: "Leadership Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leadership Retrieved Successfully",
      data: getDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports.EditLeadership = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, image, description } = req.body;

    const updatedDetail = await Leadership.findByIdAndUpdate(
      id,
      { name, position, image, description },
      { new: true }
    );

    if (!updatedDetail) {
      return res.status(404).json({
        success: false,
        message: "Leadership Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leadership Updated Successfully",
      data: updatedDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports.DeleteLeadership = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDetail = await Leadership.findByIdAndDelete(id);

    if (!deletedDetail) {
      return res.status(404).json({
        success: false,
        message: "Leadership Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leadership Deleted Successfully",
      data: deletedDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
