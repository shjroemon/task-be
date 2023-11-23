const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const taskController = require("../controllers/taskController");

router.post(
  "/create-task",
  [body("title").notEmpty().withMessage("Task title is required")],
  taskController.createTask
);

router.get(
  "/get-all-tasks",
  [query("status").optional().isIn(["todo", "in-progress", "completed"])],
  taskController.getAllTasks
);

router.put(
  "/update-task",
  [body("_id").notEmpty().withMessage("Task ID is required")],
  taskController.updateTask
);

router.delete(
  "/delete-task",
  [body("_id").notEmpty().withMessage("Task ID is required")],
  taskController.deleteTask
);

router.post(
  "/upload-image",
  [body("taskId").notEmpty().withMessage("Task ID is required")],
  taskController.uploadImage
);

module.exports = router;
