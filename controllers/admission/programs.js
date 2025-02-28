// controllers/programController.js
const Program = require('../../models/admission/programs');

exports.createProgram = async (req, res) => {
  try {
    const { title, program_type } = req.body;
    const newProgram = new Program({
      title,
      program_type
    });
    await newProgram.save();
    res.status(201).json({ message: 'Program created successfully', data: newProgram });
  } catch (error) {
    res.status(500).json({ message: 'Error creating program', error });
  }
};


exports.getAllPrograms = async (req, res) => {
    try {
      const programs = await Program.find();
      res.status(200).json({ message: 'Programs fetched successfully', data: programs });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching programs', error });
    }
  };


  exports.getProgramById = async (req, res) => {
    try {
      const program = await Program.findById(req.params.id);
      if (!program) {
        return res.status(404).json({ message: 'Program not found' });
      }
      res.status(200).json({ message: 'Program fetched successfully', data: program });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching program', error });
    }
  };

  exports.updateProgram = async (req, res) => {
    try {
      const { title, program_type } = req.body;
      const updatedProgram = await Program.findByIdAndUpdate(
        req.params.id,
        { title, program_type },
        { new: true } // Return the updated document
      );
      if (!updatedProgram) {
        return res.status(404).json({ message: 'Program not found' });
      }
      res.status(200).json({ message: 'Program updated successfully', data: updatedProgram });
    } catch (error) {
      res.status(500).json({ message: 'Error updating program', error });
    }
  };

  exports.deleteProgram = async (req, res) => {
    try {
      const deletedProgram = await Program.findByIdAndDelete(req.params.id);
      if (!deletedProgram) {
        return res.status(404).json({ message: 'Program not found' });
      }
      res.status(200).json({ message: 'Program deleted successfully', data: deletedProgram });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting program', error });
    }
  };