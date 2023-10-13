const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create-task", authMiddleware, taskController.createTask);
router.post("/all-tasks", authMiddleware, taskController.getAllTasks);
router.post("/update-task", authMiddleware, taskController.updateTask);
router.post("/delete-task", authMiddleware, taskController.deleteTask);
router.post("/upload-image", authMiddleware, taskController.uploadImage);
router.post("/soft-delete-task", authMiddleware, taskController.softDeleteTask);

module.exports = router;
