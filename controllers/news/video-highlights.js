// controllers/videoHighlightController.js
const VideoHighlight = require('../../models/news/video-highlights');

exports.createVideoHighlight = async (req, res) => {
  try {
    const { name, video, order } = req.body;

    const newVideoHighlight = new VideoHighlight({
      name,
      video,
      order,
    });

    await newVideoHighlight.save();
    res.status(201).json({ message: 'Video highlight created successfully', data: newVideoHighlight });
  } catch (error) {
    res.status(500).json({ message: 'Error creating video highlight', error });
  }
};

exports.getAllVideoHighlights = async (req, res) => {
    try {
      const videoHighlights = await VideoHighlight.find().sort({ order: 1 }); // Sorting by order
      res.status(200).json({ message: 'Video highlights fetched successfully', data: videoHighlights });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching video highlights', error });
    }
  };

  exports.getVideoHighlightById = async (req, res) => {
    try {
      const videoHighlight = await VideoHighlight.findById(req.params.id);
      if (!videoHighlight) {
        return res.status(404).json({ message: 'Video highlight not found' });
      }
      res.status(200).json({ message: 'Video highlight fetched successfully', data: videoHighlight });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching video highlight', error });
    }
  };

  exports.updateVideoHighlight = async (req, res) => {
    try {
      const { name, video, order } = req.body;
  
      const updatedVideoHighlight = await VideoHighlight.findByIdAndUpdate(
        req.params.id,
        { name, video, order },
        { new: true } // Return the updated document
      );
  
      if (!updatedVideoHighlight) {
        return res.status(404).json({ message: 'Video highlight not found' });
      }
  
      res.status(200).json({ message: 'Video highlight updated successfully', data: updatedVideoHighlight });
    } catch (error) {
      res.status(500).json({ message: 'Error updating video highlight', error });
    }
  };

  exports.deleteVideoHighlight = async (req, res) => {
    try {
      const deletedVideoHighlight = await VideoHighlight.findByIdAndDelete(req.params.id);
      if (!deletedVideoHighlight) {
        return res.status(404).json({ message: 'Video highlight not found' });
      }
  
      res.status(200).json({ message: 'Video highlight deleted successfully', data: deletedVideoHighlight });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting video highlight', error });
    }
  }; 