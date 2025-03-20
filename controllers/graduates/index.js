const Graduates = require("../../models/graduates/index");

module.exports.AddGraduates = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      resumeFile,
      // university,
      degree,
      graduation_year,
      job_role,
    } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !resumeFile ||
      !degree ||
      // !university ||
      !graduation_year ||
      !job_role
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }

    const newDetail = new Graduates({
      name,
      email,
      mobile,
      degree,
      // university,
      resumeFile,
      graduation_year,
      job_role,
    });

    await newDetail.save();

    res.status(201).json({
      success: true,
      message: "Graduates Created Successfully",
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

module.exports.GetAllGraduates = async (req, res) => {
  try {
    const getDetail = await Graduates.find();
    res.status(200).json({
      success: true,
      message: "Graduates Retrieved Successfully",
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

module.exports.GetGraduatesById = async (req, res) => {
  try {
    const { id } = req.params;
    const getDetail = await Graduates.findById(id);

    if (!getDetail) {
      return res.status(404).json({
        success: false,
        message: "Graduates Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Graduates Retrieved Successfully",
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

module.exports.EditGraduates = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      mobile,
      resumeFile,
      degree,
      // university,
      graduation_year,
      job_role,
    } = req.body;

    const updatedDetail = await Graduates.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        resumeFile,
        degree,
        // university,
        graduation_year,
        job_role,
      },
      { new: true }
    );

    if (!updatedDetail) {
      return res.status(404).json({
        success: false,
        message: "Graduates Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Graduates Updated Successfully",
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

module.exports.DeleteGraduates = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDetail = await Graduates.findByIdAndDelete(id);

    if (!deletedDetail) {
      return res.status(404).json({
        success: false,
        message: "Graduates Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Graduates Deleted Successfully",
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
