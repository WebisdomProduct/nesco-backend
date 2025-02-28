// controllers/admissionProspectusController.js
const AdmissionProspectus = require('../../models/admission/prospectus');

exports.createAdmissionProspectus = async (req, res) => {
  try {
    const { name, document, status } = req.body;
    const newAdmissionProspectus = new AdmissionProspectus({
      name,
      document,
      status
    });
    await newAdmissionProspectus.save();
    res.status(201).json({ message: 'AdmissionProspectus created successfully', data: newAdmissionProspectus });
  } catch (error) {
    res.status(500).json({ message: 'Error creating AdmissionProspectus', error });
  }
};

exports.getAllAdmissionProspectuses = async (req, res) => {
    try {
      const admissionProspectuses = await AdmissionProspectus.find();
      res.status(200).json({ message: 'AdmissionProspectus records fetched successfully', data: admissionProspectuses });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching AdmissionProspectus records', error });
    }
  };


  exports.getAdmissionProspectusById = async (req, res) => {
    try {
      const admissionProspectus = await AdmissionProspectus.findById(req.params.id);
      if (!admissionProspectus) {
        return res.status(404).json({ message: 'AdmissionProspectus not found' });
      }
      res.status(200).json({ message: 'AdmissionProspectus fetched successfully', data: admissionProspectus });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching AdmissionProspectus', error });
    }
  };


  exports.updateAdmissionProspectus = async (req, res) => {
    try {
      const { name, document, status } = req.body;
      const updatedAdmissionProspectus = await AdmissionProspectus.findByIdAndUpdate(
        req.params.id,
        { name, document, status },
        { new: true } // Return the updated document
      );
      if (!updatedAdmissionProspectus) {
        return res.status(404).json({ message: 'AdmissionProspectus not found' });
      }
      res.status(200).json({ message: 'AdmissionProspectus updated successfully', data: updatedAdmissionProspectus });
    } catch (error) {
      res.status(500).json({ message: 'Error updating AdmissionProspectus', error });
    }
  };

  exports.deleteAdmissionProspectus = async (req, res) => {
    try {
      const deletedAdmissionProspectus = await AdmissionProspectus.findByIdAndDelete(req.params.id);
      if (!deletedAdmissionProspectus) {
        return res.status(404).json({ message: 'AdmissionProspectus not found' });
      }
      res.status(200).json({ message: 'AdmissionProspectus deleted successfully', data: deletedAdmissionProspectus });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting AdmissionProspectus', error });
    }
  };