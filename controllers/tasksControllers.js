const Task = require("../models/taskModel");
const cloudinary = require("../config/cloudinaryConfig");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../utils/validation");

const createTask = async (req, res) => {
  try {
    const { error } = validateCreateTask(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        error: error.details[0].message,
      });
    }

    const newTask = new Task(req.body);
    await newTask.save();
    res.send({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "all") {
        delete req.body[key];
      }
    });
    delete req.body["userId"];
    const tasks = await Task.find(req.body)
      .populate("assignedTo")
      .populate("assignedBy")
      .populate("project")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { error } = validateUpdateTask(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        error: error.details[0].message,
      });
    }

    await Task.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.body._id);
    res.send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.send({
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

    res.send({
      success: true,
      message: "Image uploaded successfully",
      data: imageURL,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  uploadImage,
};
