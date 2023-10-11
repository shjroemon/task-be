const Notification = require("../models/notificationsModel");
const { validateNotification } = require("../utils/validationNotification");

const addNotification = async (req, res) => {
  try {
    const { error } = validateNotification(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        error: error.details[0].message,
      });
    }

    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.send({
      success: true,
      data: newNotification,
      message: "Notification added successfully",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

const markNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.body.userId,
        read: false,
      },
      {
        read: true,
      }
    );
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Notifications marked as read",
      data: notifications,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

const removeAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({
      user: req.body.userId,
    });
    res.send({
      success: true,
      message: "All notifications deleted",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  addNotification,
  getAllNotifications,
  markNotificationsAsRead,
  removeAllNotifications,
};
