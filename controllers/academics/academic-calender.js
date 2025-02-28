const AcademicCalendar = require('../../models/academics/academic-calender');

exports.createAcademicCalendar = async (req, res) => {
  try {
    const { course_type, category, name, sharable_link } = req.body;

    const newAcademicCalendar = new AcademicCalendar({
      course_type,
      category,
      name,
      sharable_link,
    });

    await newAcademicCalendar.save();
    res.status(201).json({ message: 'Academic calendar entry created successfully', data: newAcademicCalendar });
  } catch (error) {
    res.status(500).json({ message: 'Error creating academic calendar entry', error });
  }
};

exports.getAllAcademicCalendars = async (req, res) => {
    try {
      const academicCalendars = await AcademicCalendar.find();
      res.status(200).json({ message: 'Academic calendar entries fetched successfully', data: academicCalendars });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching academic calendar entries', error });
    }
  };


  exports.getAcademicCalendarById = async (req, res) => {
    try {
      const academicCalendar = await AcademicCalendar.findById(req.params.id);
      if (!academicCalendar) {
        return res.status(404).json({ message: 'Academic calendar entry not found' });
      }
      res.status(200).json({ message: 'Academic calendar entry fetched successfully', data: academicCalendar });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching academic calendar entry', error });
    }
  };

  exports.updateAcademicCalendar = async (req, res) => {
    try {
      const { course_type, category, name, sharable_link } = req.body;
  
      const updatedAcademicCalendar = await AcademicCalendar.findByIdAndUpdate(
        req.params.id,
        { course_type, category, name, sharable_link },
        { new: true } // Return the updated document
      );
  
      if (!updatedAcademicCalendar) {
        return res.status(404).json({ message: 'Academic calendar entry not found' });
      }
  
      res.status(200).json({ message: 'Academic calendar entry updated successfully', data: updatedAcademicCalendar });
    } catch (error) {
      res.status(500).json({ message: 'Error updating academic calendar entry', error });
    }
  };


  exports.deleteAcademicCalendar = async (req, res) => {
    try {
      const deletedAcademicCalendar = await AcademicCalendar.findByIdAndDelete(req.params.id);
      if (!deletedAcademicCalendar) {
        return res.status(404).json({ message: 'Academic calendar entry not found' });
      }
  
      res.status(200).json({ message: 'Academic calendar entry deleted successfully', data: deletedAcademicCalendar });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting academic calendar entry', error });
    }
  };