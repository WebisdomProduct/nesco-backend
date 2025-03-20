const internship = require("../../models/internship");

module.exports.AddInternship = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      university,
      degree,
      expected_year,
      resumeFile,
    } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !university ||
      !degree ||
      !expected_year ||
      !resumeFile
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }

    const newDetail = new internship({
      name,
      email,
      mobile,
      university,
      degree,
      expected_year,
      resumeFile,
    });

    await newDetail.save();

    res.status(201).json({
      success: true,
      message: "Internship Created Successfully",
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

module.exports.GetAllInternship = async (req, res) => {
  try {
    const getDetail = await internship.find();
    res.status(200).json({
      success: true,
      message: "Internships Retrieved Successfully",
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

module.exports.GetInternshipById = async (req, res) => {
  try {
    const { id } = req.params;
    const getDetail = await internship.findById(id);

    if (!getDetail) {
      return res.status(404).json({
        success: false,
        message: "Internship Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship Retrieved Successfully",
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

module.exports.EditInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      mobile,
      university,
      degree,
      expected_year,
      resumeFile,
    } = req.body;

    const updatedDetail = await internship.findByIdAndUpdate(
      id,
      { name, email, mobile, university, degree, expected_year, resumeFile },
      { new: true }
    );

    if (!updatedDetail) {
      return res.status(404).json({
        success: false,
        message: "Internship Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship Updated Successfully",
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

module.exports.DeleteInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDetail = await internship.findByIdAndDelete(id);

    if (!deletedDetail) {
      return res.status(404).json({
        success: false,
        message: "Internship Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship Deleted Successfully",
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
