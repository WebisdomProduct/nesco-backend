const Approval = require('../../models/academics/approvals');

exports.createApproval = async (req, res) => {
  try {
    const { name, document } = req.body;

    const newApproval = new Approval({
      name,
      document
    });

    await newApproval.save();
    res.status(201).json({ message: 'Approval created successfully', data: newApproval });
  } catch (error) {
    res.status(500).json({ message: 'Error creating approval', error });
  }
};

exports.getAllApprovals = async (req, res) => {
    try {
      const approvals = await Approval.find();
      res.status(200).json({ message: 'Approvals fetched successfully', data: approvals });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching approvals', error });
    }
  };

  exports.getApprovalById = async (req, res) => {
    try {
      const approval = await Approval.findById(req.params.id);
      if (!approval) {
        return res.status(404).json({ message: 'Approval not found' });
      }
      res.status(200).json({ message: 'Approval fetched successfully', data: approval });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching approval', error });
    }
  };

  exports.updateApproval = async (req, res) => {
    try {
      const { name, document } = req.body;
  
      const updatedApproval = await Approval.findByIdAndUpdate(
        req.params.id,
        { name, document },
        { new: true } // Return the updated document
      );
  
      if (!updatedApproval) {
        return res.status(404).json({ message: 'Approval not found' });
      }
  
      res.status(200).json({ message: 'Approval updated successfully', data: updatedApproval });
    } catch (error) {
      res.status(500).json({ message: 'Error updating approval', error });
    }
  };

  exports.deleteApproval = async (req, res) => {
    try {
      const deletedApproval = await Approval.findByIdAndDelete(req.params.id);
      if (!deletedApproval) {
        return res.status(404).json({ message: 'Approval not found' });
      }
  
      res.status(200).json({ message: 'Approval deleted successfully', data: deletedApproval });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting approval', error });
    }
  };