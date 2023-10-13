const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationsControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/add-notification",
  authMiddleware,
  notificationController.addNotification
);
router.get(
  "/all-notifications",
  authMiddleware,
  notificationController.getAllNotifications
);
router.post("/mark-as-read", authMiddleware, notificationController.markAsRead);
router.delete(
  "/remove-all-notifications",
  authMiddleware,
  notificationController.deleteAllNotifications
);

module.exports = router;
