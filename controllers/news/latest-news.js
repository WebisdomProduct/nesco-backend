// controllers/latestNewsController.js
const LatestNews = require("../../models/news/latest-news");

exports.createNews = async (req, res) => {
  try {
    const { title, description, created_by, comments, shareable_url,image  } =
      req.body;

    const newNews = new LatestNews({
      title,
      description,
      created_by,
      comments,
      shareable_url,
      image
    });

    await newNews.save();
    res
      .status(201)
      .json({ message: "News created successfully", data: newNews });
  } catch (error) {
    res.status(500).json({ message: "Error creating news", error });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const news = await LatestNews.find();
    res.status(200).json({ message: "News fetched successfully", data: news });
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await LatestNews.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News fetched successfully", data: news });
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { title, description, created_by, comments, shareable_url,image } =
      req.body;

    const updatedNews = await LatestNews.findByIdAndUpdate(
      req.params.id,
      { title, description, created_by, comments, shareable_url,image },
      { new: true } // Return the updated document
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res
      .status(200)
      .json({ message: "News updated successfully", data: updatedNews });
  } catch (error) {
    res.status(500).json({ message: "Error updating news", error });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const deletedNews = await LatestNews.findByIdAndDelete(req.params.id);
    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res
      .status(200)
      .json({ message: "News deleted successfully", data: deletedNews });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;

    const updatedNews = await LatestNews.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } }, // Add comment to the array
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res
      .status(200)
      .json({ message: "Comment added successfully", data: updatedNews });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};
