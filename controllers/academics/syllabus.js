const Syllabus = require('../../models/academics/syllabus');

exports.createSyllabus = async (req, res) => {
  try {
    const { category, course_type, date, days, event, holiday_type } = req.body;

    const newSyllabus = new Syllabus({
      category,
      course_type,
      date,
      days,
      event,
      holiday_type,
    });

    await newSyllabus.save();
    res.status(201).json({ message: 'Syllabus entry created successfully', data: newSyllabus });
  } catch (error) {
    res.status(500).json({ message: 'Error creating syllabus entry', error });
  }
};

exports.getAllSyllabus = async (req, res) => {
    try {
      const syllabusEntries = await Syllabus.find();
      res.status(200).json({ message: 'Syllabus entries fetched successfully', data: syllabusEntries });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching syllabus entries', error });
    }
  };

  exports.getSyllabusById = async (req, res) => {
    try {
      const syllabusEntry = await Syllabus.findById(req.params.id);
      if (!syllabusEntry) {
        return res.status(404).json({ message: 'Syllabus entry not found' });
      }
      res.status(200).json({ message: 'Syllabus entry fetched successfully', data: syllabusEntry });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching syllabus entry', error });
    }
  };


  exports.updateSyllabus = async (req, res) => {
    try {
      const { category, course_type, date, days, event, holiday_type } = req.body;
  
      const updatedSyllabus = await Syllabus.findByIdAndUpdate(
        req.params.id,
        { category, course_type, date, days, event, holiday_type },
        { new: true } // Return the updated document
      );
  
      if (!updatedSyllabus) {
        return res.status(404).json({ message: 'Syllabus entry not found' });
      }
  
      res.status(200).json({ message: 'Syllabus entry updated successfully', data: updatedSyllabus });
    } catch (error) {
      res.status(500).json({ message: 'Error updating syllabus entry', error });
    }
  };

  exports.deleteSyllabus = async (req, res) => {
    try {
      const deletedSyllabus = await Syllabus.findByIdAndDelete(req.params.id);
      if (!deletedSyllabus) {
        return res.status(404).json({ message: 'Syllabus entry not found' });
      }
  
      res.status(200).json({ message: 'Syllabus entry deleted successfully', data: deletedSyllabus });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting syllabus entry', error });
    }
  };