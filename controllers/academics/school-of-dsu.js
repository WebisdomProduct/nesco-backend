// controllers/schoolOfDSUController.js
const SchoolOfDSU = require('../../models/academics/school-of-dsu');

exports.createSchool = async (req, res) => {
  try {
    const { type_name, image, social_media, courses } = req.body;

    const newSchool = new SchoolOfDSU({
      type_name,
      image,
      social_media,
      courses,
    });

    await newSchool.save();
    res.status(201).json({ message: 'School created successfully', data: newSchool });
  } catch (error) {
    res.status(500).json({ message: 'Error creating school', error });
  }
};

exports.getAllSchools = async (req, res) => {
    try {
      const schools = await SchoolOfDSU.find();
      res.status(200).json({ message: 'Schools fetched successfully', data: schools });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching schools', error });
    }
  };

  exports.getSchoolById = async (req, res) => {
    try {
      const school = await SchoolOfDSU.findById(req.params.id);
      if (!school) {
        return res.status(404).json({ message: 'School not found' });
      }
      res.status(200).json({ message: 'School fetched successfully', data: school });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching school', error });
    }
  };

  exports.updateSchool = async (req, res) => {
    try {
      const { type_name, image, social_media, courses } = req.body;
  
      const updatedSchool = await SchoolOfDSU.findByIdAndUpdate(
        req.params.id,
        { type_name, image, social_media, courses },
        { new: true } // Return the updated document
      );
  
      if (!updatedSchool) {
        return res.status(404).json({ message: 'School not found' });
      }
  
      res.status(200).json({ message: 'School updated successfully', data: updatedSchool });
    } catch (error) {
      res.status(500).json({ message: 'Error updating school', error });
    }
  };

  exports.deleteSchool = async (req, res) => {
    try {
      const deletedSchool = await SchoolOfDSU.findByIdAndDelete(req.params.id);
      if (!deletedSchool) {
        return res.status(404).json({ message: 'School not found' });
      }
  
      res.status(200).json({ message: 'School deleted successfully', data: deletedSchool });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting school', error });
    }
  };