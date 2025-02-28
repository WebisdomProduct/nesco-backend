// controllers/blogController.js
const Blog = require('../../models/blogs');

exports.createBlog = async (req, res) => {
  try {
    const { title, short_description, long_description, thumbnail, cover_image, tags } = req.body;

    const newBlog = new Blog({
      title,
      short_description,
      long_description,
      thumbnail,
      cover_image,
      tags,
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', data: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

exports.getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json({ message: 'Blogs fetched successfully', data: blogs });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs', error });
    }
  };


  exports.getBlogById = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json({ message: 'Blog fetched successfully', data: blog });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blog', error });
    }
  };


  exports.updateBlog = async (req, res) => {
    try {
      const { title, short_description, long_description, thumbnail, cover_image, tags } = req.body;
  
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, short_description, long_description, thumbnail, cover_image, tags },
        { new: true } // Return the updated document
      );
  
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.status(200).json({ message: 'Blog updated successfully', data: updatedBlog });
    } catch (error) {
      res.status(500).json({ message: 'Error updating blog', error });
    }
  };

  exports.deleteBlog = async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.status(200).json({ message: 'Blog deleted successfully', data: deletedBlog });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting blog', error });
    }
  };