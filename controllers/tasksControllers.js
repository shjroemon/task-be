const { validationResult } = require("express-validator");
const Task = require("../models/taskModel");
const cloudinary = require("../config/cloudinaryConfig");

const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "all") {
        delete req.body[key];
      }
    });
    delete req.body["userId"];

    const tasks = await Task.find({
      ...req.body,
      deleted: { $ne: true },
    })
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.send({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Soft delete: set deleted field instead of actually deleting
    const deletedTask = await Task.findByIdAndUpdate(
      req.body._id,
      { deleted: true },
      { new: true }
    );
    res.send({
      success: true,
      message: "Task marked as deleted",
      data: deletedTask,
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

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
