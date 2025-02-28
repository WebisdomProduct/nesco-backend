const StudentAffairs = require('../../models/students/student-affairs');

exports.createStudentAffairs = async (req, res) => {
  try {
    const { image, description, color, campus_events } = req.body;

    const newStudentAffairs = new StudentAffairs({
      image,
      description,
      color,
      campus_events
    });

    await newStudentAffairs.save();
    res.status(201).json({ message: 'Student Affairs created successfully', data: newStudentAffairs });
  } catch (error) {
    res.status(500).json({ message: 'Error creating student affairs', error });
  }
};

exports.getAllStudentAffairs = async (req, res) => {
    try {
      const studentAffairs = await StudentAffairs.find();
      res.status(200).json({ message: 'Student Affairs entries fetched successfully', data: studentAffairs });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching student affairs entries', error });
    }
  };

  exports.getStudentAffairsById = async (req, res) => {
    try {
      const studentAffairs = await StudentAffairs.findById(req.params.id);
      if (!studentAffairs) {
        return res.status(404).json({ message: 'Student Affairs entry not found' });
      }
      res.status(200).json({ message: 'Student Affairs fetched successfully', data: studentAffairs });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching student affairs entry', error });
    }
  };


  exports.updateStudentAffairs = async (req, res) => {
    try {
      const { image, description, color, campus_events } = req.body;
  
      const updatedStudentAffairs = await StudentAffairs.findByIdAndUpdate(
        req.params.id,
        { image, description, color, campus_events },
        { new: true } // Return the updated document
      );
  
      if (!updatedStudentAffairs) {
        return res.status(404).json({ message: 'Student Affairs entry not found' });
      }
  
      res.status(200).json({ message: 'Student Affairs updated successfully', data: updatedStudentAffairs });
    } catch (error) {
      res.status(500).json({ message: 'Error updating student affairs entry', error });
    }
  };


  exports.deleteStudentAffairs = async (req, res) => {
    try {
      const deletedStudentAffairs = await StudentAffairs.findByIdAndDelete(req.params.id);
      if (!deletedStudentAffairs) {
        return res.status(404).json({ message: 'Student Affairs entry not found' });
      }
  
      res.status(200).json({ message: 'Student Affairs entry deleted successfully', data: deletedStudentAffairs });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting student affairs entry', error });
    }
  };