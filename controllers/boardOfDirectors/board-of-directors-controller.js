const uploadToS3 = require('../../config/s3Uploader');
const Directors = require('../../models/boardDirectors/boardOfDirectors');

const createDirector = async (req, res) => {
  try {
    const { name, description, position } = req.body;

    if (!name || !description || !position) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!req.files || !req.files.directorImage) {
      return res.status(400).json({ message: 'Director image is required' });
    }

    const directorImageUrl = await uploadToS3(
      req.files.directorImage[0],
      'directors'
    );

    let parsedDescription;
    try {
      parsedDescription = JSON.parse(description);
    } catch {
      return res.status(400).json({ message: 'Invalid description format' });
    }

    const newDirector = new Directors({
      image: directorImageUrl,
      name,
      position,
      description: parsedDescription,
    });

    await newDirector.save();

    return res.status(201).json({
      message: 'Director created successfully',
      data: newDirector,
    });
  } catch (error) {
    console.error('Create Director Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateDirector = async (req, res) => {
  const { id } = req.params;

  try {
    const director = await Directors.findById(id);
    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }

    const { name, description, position } = req.body;

    if (name) director.name = name;
    if (position) director.position = position;

    if (description) {
      try {
        director.description = JSON.parse(description);
      } catch {
        return res.status(400).json({ message: 'Invalid description format' });
      }
    }

    if (req.files && req.files.directorImage) {
      const directorImageUrl = await uploadToS3(
        req.files.directorImage[0],
        'directors'
      );
      director.image = directorImageUrl;
    }

    await director.save();

    return res.json({
      message: 'Director updated successfully',
      data: director,
    });
  } catch (error) {
    console.error('Update Director Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getDirectors = async (req, res) => {
  try {
    console.log('Fetching all directors');
    const directors = await Directors.find();
    console.log(`Found ${directors.length} directors`);
    console.log(directors);
    return res.status(200).json(directors);
  } catch (error) {
    console.error('Get Directors Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteDirector = async (req, res) => {
  const { id } = req.params;

  try {
    const director = await Directors.findByIdAndDelete(id);
    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }

    return res.json({ message: 'Director deleted successfully' });
  } catch (error) {
    console.error('Delete Director Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createDirector,
  updateDirector,
  getDirectors,
  deleteDirector,
};
