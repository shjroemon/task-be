const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const notificationController = require("../controllers/notificationsControllers");

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
router.post(
  "/mark-as-read",
  authMiddleware,
  notificationController.markNotificationsAsRead
);
router.delete(
  "/remove-all-notifications",
  authMiddleware,
  notificationController.removeAllNotifications
);

module.exports = router;
