// controllers/financeCommitteeController.js
const FinanceCommitte = require("../../models/about-us/finance-committe");

exports.createFinanceCommitteeMember = async (req, res) => {
  try {
    const { name, position, role, status } = req.body;
    const newMember = new FinanceCommitte({
      name,
      position,
      role,
      status,
    });
    await newMember.save();
    res
      .status(201)
      .json({
        message: "Finance committee member created successfully",
        data: newMember,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating finance committee member", error });
  }
};

// controllers/financeCommitteeController.js
exports.getAllFinanceCommitteeMembers = async (req, res) => {
  try {
    const members = await FinanceCommitte.find();
    res
      .status(200)
      .json({
        message: "All finance committee members fetched successfully",
        data: members,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching finance committee members", error });
  }
};

// controllers/financeCommitteeController.js
exports.getFinanceCommitteeMemberById = async (req, res) => {
  try {
    const member = await FinanceCommitte.findById(req.params.id);
    if (!member) {
      return res
        .status(404)
        .json({ message: "Finance committee member not found" });
    }
    res
      .status(200)
      .json({
        message: "Finance committee member fetched successfully",
        data: member,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching finance committee member", error });
  }
};

// controllers/financeCommitteeController.js
exports.updateFinanceCommitteeMember = async (req, res) => {
  try {
    const { name, position, role, status } = req.body;
    const updatedMember = await FinanceCommitte.findByIdAndUpdate(
      req.params.id,
      { name, position, role, status },
      { new: true } // Return the updated document
    );
    if (!updatedMember) {
      return res
        .status(404)
        .json({ message: "Finance committee member not found" });
    }
    res
      .status(200)
      .json({
        message: "Finance committee member updated successfully",
        data: updatedMember,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating finance committee member", error });
  }
};

// controllers/financeCommitteeController.js
exports.deleteFinanceCommitteeMember = async (req, res) => {
  try {
    const deletedMember = await FinanceCommitte.findByIdAndDelete(
      req.params.id
    );
    if (!deletedMember) {
      return res
        .status(404)
        .json({ message: "Finance committee member not found" });
    }
    res
      .status(200)
      .json({
        message: "Finance committee member deleted successfully",
        data: deletedMember,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting finance committee member", error });
  }
};
