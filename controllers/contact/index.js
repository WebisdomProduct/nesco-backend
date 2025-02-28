// controllers/contactController.js
const Contact = require('../../models/contact');

exports.createContact = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, inquiry_type, inquiry } = req.body;

    const newContact = new Contact({
      first_name,
      last_name,
      email,
      phone,
      inquiry_type,
      inquiry,
    });

    await newContact.save();
    res.status(201).json({ message: 'Contact created successfully', data: newContact });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

exports.getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json({ message: 'Contacts fetched successfully', data: contacts });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching contacts', error });
    }
  };


  exports.getContactById = async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({ message: 'Contact fetched successfully', data: contact });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching contact', error });
    }
  };


  exports.updateContact = async (req, res) => {
    try {
      const { first_name, last_name, email, phone, inquiry_type, inquiry } = req.body;
  
      const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { first_name, last_name, email, phone, inquiry_type, inquiry },
        { new: true } // Return the updated document
      );
  
      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      res.status(200).json({ message: 'Contact updated successfully', data: updatedContact });
    } catch (error) {
      res.status(500).json({ message: 'Error updating contact', error });
    }
  };

  exports.deleteContact = async (req, res) => {
    try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id);
      if (!deletedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      res.status(200).json({ message: 'Contact deleted successfully', data: deletedContact });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting contact', error });
    }
  };