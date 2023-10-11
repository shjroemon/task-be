const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const taskController = require("../controllers/tasksControllers");
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create-task", authMiddleware, taskController.createTask);
router.post("/all-tasks", authMiddleware, taskController.getAllTasks);
router.post("/update-task", authMiddleware, taskController.updateTask);
router.post("/delete-task", authMiddleware, taskController.deleteTask);
router.post(
  "/upload-image",
  authMiddleware,
  upload.single("file"),
  taskController.uploadImage
);

module.exports = router;
