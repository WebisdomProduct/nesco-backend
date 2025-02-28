// controllers/studentLifeController.js
const StudentLife = require('../../models/students/student-life');

exports.createStudentLife = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const newStudentLife = new StudentLife({
      title,
      description,
      image
    });

    await newStudentLife.save();
    res.status(201).json({ message: 'Student Life created successfully', data: newStudentLife });
  } catch (error) {
    res.status(500).json({ message: 'Error creating student life', error });
  }
};

exports.getAllStudentLife = async (req, res) => {
    try {
      const studentLife = await StudentLife.find();
      res.status(200).json({ message: 'Student Life entries fetched successfully', data: studentLife });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching student life entries', error });
    }
  };


  exports.getStudentLifeById = async (req, res) => {
    try {
      const studentLife = await StudentLife.findById(req.params.id);
      if (!studentLife) {
        return res.status(404).json({ message: 'Student Life entry not found' });
      }
      res.status(200).json({ message: 'Student Life fetched successfully', data: studentLife });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching student life entry', error });
    }
  };


  exports.updateStudentLife = async (req, res) => {
    try {
      const { title, description, image } = req.body;
  
      const updatedStudentLife = await StudentLife.findByIdAndUpdate(
        req.params.id,
        { title, description, image },
        { new: true } // Return the updated document
      );
  
      if (!updatedStudentLife) {
        return res.status(404).json({ message: 'Student Life entry not found' });
      }
  
      res.status(200).json({ message: 'Student Life updated successfully', data: updatedStudentLife });
    } catch (error) {
      res.status(500).json({ message: 'Error updating student life entry', error });
    }
  };


  exports.deleteStudentLife = async (req, res) => {
    try {
      const deletedStudentLife = await StudentLife.findByIdAndDelete(req.params.id);
      if (!deletedStudentLife) {
        return res.status(404).json({ message: 'Student Life entry not found' });
      }
  
      res.status(200).json({ message: 'Student Life entry deleted successfully', data: deletedStudentLife });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting student life entry', error });
    }
  };