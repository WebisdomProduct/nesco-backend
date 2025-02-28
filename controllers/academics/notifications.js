const Notification = require('../../models/academics/notifications');

exports.createNotification = async (req, res) => {
  try {
    const { date, name, shareable_link } = req.body;

    const newNotification = new Notification({
      date,
      name,
      shareable_link,
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully', data: newNotification });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error });
  }
};

exports.getAllNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find();
      res.status(200).json({ message: 'Notifications fetched successfully', data: notifications });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error });
    }
  };

  exports.getNotificationById = async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      res.status(200).json({ message: 'Notification fetched successfully', data: notification });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notification', error });
    }
  };

  exports.updateNotification = async (req, res) => {
    try {
      const { date, name, shareable_link } = req.body;
  
      const updatedNotification = await Notification.findByIdAndUpdate(
        req.params.id,
        { date, name, shareable_link },
        { new: true } // Return the updated document
      );
  
      if (!updatedNotification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.status(200).json({ message: 'Notification updated successfully', data: updatedNotification });
    } catch (error) {
      res.status(500).json({ message: 'Error updating notification', error });
    }
  };

  exports.deleteNotification = async (req, res) => {
    try {
      const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
      if (!deletedNotification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.status(200).json({ message: 'Notification deleted successfully', data: deletedNotification });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting notification', error });
    }
  };