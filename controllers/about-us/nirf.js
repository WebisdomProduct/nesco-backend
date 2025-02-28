// controllers/nirfDocumentsController.js
const NirfDocuments = require("../../models/about-us/nirf");

exports.createNirfDocument = async (req, res) => {
  try {
    const { name, document, year, status } = req.body;
    const newNirfDocument = new NirfDocuments({
      name,
      document,
      year,
      status,
    });
    await newNirfDocument.save();
    res
      .status(201)
      .json({
        message: "NirfDocument created successfully",
        data: newNirfDocument,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating NirfDocument", error });
  }
};


// controllers/nirfDocumentsController.js
exports.getAllNirfDocuments = async (req, res) => {
    try {
      const nirfDocuments = await NirfDocuments.find();
      res.status(200).json({ message: 'All NirfDocuments records fetched successfully', data: nirfDocuments });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching NirfDocuments records', error });
    }
  };

  // controllers/nirfDocumentsController.js
exports.getNirfDocumentById = async (req, res) => {
    try {
      const nirfDocument = await NirfDocuments.findById(req.params.id);
      if (!nirfDocument) {
        return res.status(404).json({ message: 'NirfDocument not found' });
      }
      res.status(200).json({ message: 'NirfDocument fetched successfully', data: nirfDocument });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching NirfDocument', error });
    }
  };

  // controllers/nirfDocumentsController.js
exports.updateNirfDocument = async (req, res) => {
    try {
      const { name, document, year, status } = req.body;
      const updatedNirfDocument = await NirfDocuments.findByIdAndUpdate(
        req.params.id,
        { name, document, year, status },
        { new: true } // Return the updated document
      );
      if (!updatedNirfDocument) {
        return res.status(404).json({ message: 'NirfDocument not found' });
      }
      res.status(200).json({ message: 'NirfDocument updated successfully', data: updatedNirfDocument });
    } catch (error) {
      res.status(500).json({ message: 'Error updating NirfDocument', error });
    }
  };


  // controllers/nirfDocumentsController.js
exports.deleteNirfDocument = async (req, res) => {
    try {
      const deletedNirfDocument = await NirfDocuments.findByIdAndDelete(req.params.id);
      if (!deletedNirfDocument) {
        return res.status(404).json({ message: 'NirfDocument not found' });
      }
      res.status(200).json({ message: 'NirfDocument deleted successfully', data: deletedNirfDocument });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting NirfDocument', error });
    }
  };