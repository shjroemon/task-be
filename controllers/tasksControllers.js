const Task = require("../models/taskModel");
const cloudinary = require("../config/cloudinaryConfig");

const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    // Remove unnecessary keys from the request body if needed
    removeKeys(req.body);
    const tasks = await Task.find(req.body)
      .populate("assignedTo")
      .populate("assignedBy")
      .populate("project")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.body._id, req.body);
    res.json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.body._id);
    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

const softDeleteTask = async (req, res) => {
  try {
    const taskId = req.body._id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send({
        success: false,
        message: "Task not found",
      });
    }

    // Update isDeleted flag
    task.isDeleted = true;
    await task.save();

    res.send({
      success: true,
      message: "Task soft deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "tasks",
    });
    const imageURL = result.secure_url;

    await Task.findOneAndUpdate(
      { _id: req.body.taskId },
      {
        $push: {
          attachments: imageURL,
        },
      }
    );

    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: imageURL,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  uploadImage,
  softDeleteTask,
};
