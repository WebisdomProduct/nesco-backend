// controllers/photoGalleryController.js
const PhotoGallery = require("../../models/news/photo-gallery");

exports.createPhoto = async (req, res) => {
  try {
    const { name, image, order } = req.body;

    const newPhoto = new PhotoGallery({
      name,
      image,
      order,
    });

    await newPhoto.save();
    res
      .status(201)
      .json({ message: "Photo added successfully", data: newPhoto });
  } catch (error) {
    res.status(500).json({ message: "Error adding photo", error });
  }
};

exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await PhotoGallery.find().sort({ order: 1 }); // Sorting by order field
    res
      .status(200)
      .json({ message: "Photos fetched successfully", data: photos });
  } catch (error) {
    res.status(500).json({ message: "Error fetching photos", error });
  }
};

exports.getPhotoById = async (req, res) => {
  try {
    const photo = await PhotoGallery.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res
      .status(200)
      .json({ message: "Photo fetched successfully", data: photo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching photo", error });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const { name, image, order } = req.body;

    const updatedPhoto = await PhotoGallery.findByIdAndUpdate(
      req.params.id,
      { name, image, order },
      { new: true } // Return the updated document
    );

    if (!updatedPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res
      .status(200)
      .json({ message: "Photo updated successfully", data: updatedPhoto });
  } catch (error) {
    res.status(500).json({ message: "Error updating photo", error });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const deletedPhoto = await PhotoGallery.findByIdAndDelete(req.params.id);
    if (!deletedPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res
      .status(200)
      .json({ message: "Photo deleted successfully", data: deletedPhoto });
  } catch (error) {
    res.status(500).json({ message: "Error deleting photo", error });
  }
};
