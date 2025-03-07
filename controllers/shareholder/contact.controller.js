const { Contact } = require("../../models/shareholder/contact.model");

module.exports.AddContact = async (req, res) => {
  try {
    const { title, address, profile, profile2, company, option, option2 } =
      req.body;

    let contactData = { title, option, option2 };

    if (option === "address") {
      contactData.address = address;

      if (option2 === "company") {
        contactData.company = company;
      } else if (option2 === "profile2") {
        contactData.profile2 = profile2;
      }
    }

    if (option === "profile") {
      if (!Array.isArray(profile)) {
        return res
          .status(400)
          .json({ success: false, message: "Profile must be an array" });
      }
      contactData.profile = profile;
    }

    const newContact = new Contact(contactData);
    await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Contact saved successfully",
      data: newContact,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.GetAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res
      .status(200)
      .json({ message: "Contacts fetched", data: contacts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Contact by ID
module.exports.GetContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ message: "Contact fetched", data: contact });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  Edit Contact by ID
module.exports.EditContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, address, profile, profile2, company, option, option2 } =
      req.body;

    let updateData = { title, option, option2 };

    if (option === "address") {
      updateData.address = address;

      if (option2 === "company") {
        updateData.company = company;
      } else if (option2 === "profile2") {
        updateData.profile2 = profile2;
      }
    }

    if (option === "profile") {
      if (!Array.isArray(profile)) {
        return res.status(400).json({ message: "Profile must be an array" });
      }
      updateData.profile = profile;
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res
      .status(200)
      .json({ message: "Contact updated", data: updatedContact });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  Delete Contact by ID
module.exports.DeleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res
      .status(200)
      .json({ message: "Contact deleted successfully", data: deletedContact });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
