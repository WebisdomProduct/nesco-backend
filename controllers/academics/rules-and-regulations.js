const RulesAndRegulations = require('../../models/academics/rules-and-regulations');

exports.createRulesAndRegulations = async (req, res) => {
  try {
    const { title, rules } = req.body;

    const newRulesAndRegulations = new RulesAndRegulations({
      title,
      rules,
    });

    await newRulesAndRegulations.save();
    res.status(201).json({ message: 'Rules and Regulations created successfully', data: newRulesAndRegulations });
  } catch (error) {
    res.status(500).json({ message: 'Error creating rules and regulations', error });
  }
};

exports.getAllRulesAndRegulations = async (req, res) => {
    try {
      const rulesAndRegulations = await RulesAndRegulations.find();
      res.status(200).json({ message: 'Rules and Regulations fetched successfully', data: rulesAndRegulations });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rules and regulations', error });
    }
  };

  exports.getRulesAndRegulationsById = async (req, res) => {
    try {
      const rulesAndRegulations = await RulesAndRegulations.findById(req.params.id);
      if (!rulesAndRegulations) {
        return res.status(404).json({ message: 'Rules and Regulations not found' });
      }
      res.status(200).json({ message: 'Rules and Regulations fetched successfully', data: rulesAndRegulations });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rules and regulations', error });
    }
  };

  exports.updateRulesAndRegulations = async (req, res) => {
    try {
      const { title, rules } = req.body;
  
      const updatedRulesAndRegulations = await RulesAndRegulations.findByIdAndUpdate(
        req.params.id,
        { title, rules },
        { new: true } 
      );
  
      if (!updatedRulesAndRegulations) {
        return res.status(404).json({ message: 'Rules and Regulations not found' });
      }
  
      res.status(200).json({ message: 'Rules and Regulations updated successfully', data: updatedRulesAndRegulations });
    } catch (error) {
      res.status(500).json({ message: 'Error updating rules and regulations', error });
    }
  };

  exports.deleteRulesAndRegulations = async (req, res) => {
    try {
      const deletedRulesAndRegulations = await RulesAndRegulations.findByIdAndDelete(req.params.id);
      if (!deletedRulesAndRegulations) {
        return res.status(404).json({ message: 'Rules and Regulations not found' });
      }
  
      res.status(200).json({ message: 'Rules and Regulations deleted successfully', data: deletedRulesAndRegulations });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting rules and regulations', error });
    }
  };