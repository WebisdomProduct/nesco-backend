const Circular = require('../../models/academics/circulars');

exports.createCircular = async (req, res) => {
  try {
    const { name, sharable_link } = req.body;

    const newCircular = new Circular({
      name,
      sharable_link
    });

    await newCircular.save();
    res.status(201).json({ message: 'Circular created successfully', data: newCircular });
  } catch (error) {
    res.status(500).json({ message: 'Error creating circular', error });
  }
};

exports.getAllCirculars = async (req, res) => {
    try {
      const circulars = await Circular.find();
      res.status(200).json({ message: 'Circulars fetched successfully', data: circulars });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching circulars', error });
    }
  };

  exports.getCircularById = async (req, res) => {
    try {
      const circular = await Circular.findById(req.params.id);
      if (!circular) {
        return res.status(404).json({ message: 'Circular not found' });
      }
      res.status(200).json({ message: 'Circular fetched successfully', data: circular });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching circular', error });
    }
  };

  exports.updateCircular = async (req, res) => {
    try {
      const { name, sharable_link } = req.body;
  
      const updatedCircular = await Circular.findByIdAndUpdate(
        req.params.id,
        { name, sharable_link },
        { new: true } // Return the updated document
      );
  
      if (!updatedCircular) {
        return res.status(404).json({ message: 'Circular not found' });
      }
  
      res.status(200).json({ message: 'Circular updated successfully', data: updatedCircular });
    } catch (error) {
      res.status(500).json({ message: 'Error updating circular', error });
    }
  };

  exports.deleteCircular = async (req, res) => {
    try {
      const deletedCircular = await Circular.findByIdAndDelete(req.params.id);
      if (!deletedCircular) {
        return res.status(404).json({ message: 'Circular not found' });
      }
  
      res.status(200).json({ message: 'Circular deleted successfully', data: deletedCircular });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting circular', error });
    }
  };