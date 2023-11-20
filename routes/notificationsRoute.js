const router = require("express").Router();
const notificationsController = require("../controllers/notificationsControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/add-notification",
  authMiddleware,
  notificationsController.addNotification
);
router.get(
  "/get-all-notifications",
  authMiddleware,
  notificationsController.getAllNotifications
);
router.post(
  "/mark-as-read",
  authMiddleware,
  notificationsController.markAsRead
);
router.delete(
  "/delete-all-notifications",
  authMiddleware,
  notificationsController.deleteAllNotifications
);

module.exports = router;
