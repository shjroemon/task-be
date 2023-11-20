const router = require("express").Router();
const tasksController = require("../controllers/tasksControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

router.post("/create-task", authMiddleware, tasksController.createTask);
router.get("/get-all-tasks", authMiddleware, tasksController.getAllTasks);
router.put("/update-task", authMiddleware, tasksController.updateTask);
router.delete("/delete-task", authMiddleware, tasksController.deleteTask);

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload-image",
  authMiddleware,
  upload.single("file"),
  tasksController.uploadImage
);

module.exports = router;
