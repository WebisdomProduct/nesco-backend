const Experienced = require("../../models/experienced/index");

module.exports.AddExperienced = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      resumeFile,
      current_company,
      job_title,
      total_experienced,
    } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !resumeFile ||
      !current_company ||
      !job_title ||
      !total_experienced
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }

    const newDetail = new Experienced({
      name,
      email,
      mobile,
      resumeFile,
      current_company,
      job_title,
      total_experienced,
    });

    await newDetail.save();

    res.status(201).json({
      success: true,
      message: "Experienced Created Successfully",
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

module.exports.GetAllExperienced = async (req, res) => {
  try {
    const getDetail = await Experienced.find();
    res.status(200).json({
      success: true,
      message: "Experienceds Retrieved Successfully",
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

module.exports.GetExperiencedById = async (req, res) => {
  try {
    const { id } = req.params;
    const getDetail = await Experienced.findById(id);

    if (!getDetail) {
      return res.status(404).json({
        success: false,
        message: "Experienced Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experienced Retrieved Successfully",
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

module.exports.EditExperienced = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      mobile,
      resumeFile,
      current_company,
      job_title,
      total_experienced,
    } = req.body;

    const updatedDetail = await Experienced.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        resumeFile,
        current_company,
        job_title,
        total_experienced,
      },
      { new: true }
    );

    if (!updatedDetail) {
      return res.status(404).json({
        success: false,
        message: "Experienced Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experienced Updated Successfully",
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

module.exports.DeleteExperienced = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDetail = await Experienced.findByIdAndDelete(id);

    if (!deletedDetail) {
      return res.status(404).json({
        success: false,
        message: "Experienced Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experienced Deleted Successfully",
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
