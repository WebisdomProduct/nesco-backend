// controllers/aboutDocumentsController.js
const AboutDocuments = require("../../models/about-us/documents");

exports.createDocument = async (req, res) => {
  try {
    const { name, document, status } = req.body;
    const newDocument = new AboutDocuments({ name, document, status });
    await newDocument.save();
    res
      .status(201)
      .json({
        message: "About document created successfully",
        data: newDocument,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating about document", error });
  }
};

// controllers/aboutDocumentsController.js
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await AboutDocuments.find();
    res
      .status(200)
      .json({ message: "All documents fetched successfully", data: documents });
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error });
  }
};

// controllers/aboutDocumentsController.js
exports.getDocumentById = async (req, res) => {
  try {
    const document = await AboutDocuments.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res
      .status(200)
      .json({ message: "Document fetched successfully", data: document });
  } catch (error) {
    res.status(500).json({ message: "Error fetching document", error });
  }
};

// controllers/aboutDocumentsController.js
exports.updateDocument = async (req, res) => {
  try {
    const { name, document, status } = req.body;
    const updatedDocument = await AboutDocuments.findByIdAndUpdate(
      req.params.id,
      { name, document, status },
      { new: true } // Return the updated document
    );
    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res
      .status(200)
      .json({
        message: "Document updated successfully",
        data: updatedDocument,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating document", error });
  }
};

// controllers/aboutDocumentsController.js
exports.deleteDocument = async (req, res) => {
  try {
    const deletedDocument = await AboutDocuments.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res
      .status(200)
      .json({
        message: "Document deleted successfully",
        data: deletedDocument,
      });
  } catch (error) {
    res.status(500).json({ message: "Error deleting document", error });
  }
};
