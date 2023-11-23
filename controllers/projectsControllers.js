const { validationResult } = require("express-validator");
const Project = require("../models/projectModel");
const User = require("../models/userModel");

const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const newProject = new Project(req.body);
    await newProject.save();
    res.send({
      success: true,
      data: newProject,
      message: "Project created successfully",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.find({
      owner: req.body.userId,
      deleted: { $ne: true },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.send({
      success: true,
      data: projects,
      currentPage: page,
      totalPages: Math.ceil(projects.length / limit),
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.body._id)
      .populate("owner")
      .populate("members.user");
    if (!project || project.deleted) {
      return res.send({
        success: false,
        message: "Project not found",
      });
    }
    res.send({
      success: true,
      data: project,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

const getProjectsByRole = async (req, res) => {
  try {
    const userId = req.body.userId;
    const projects = await Project.find({
      "members.user": userId,
      deleted: { $ne: true },
    })
      .sort({ createdAt: -1 })
      .populate("owner");
    res.send({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

const editProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.send({
      success: true,
      data: updatedProject,
      message: "Project updated successfully",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    // Soft delete: set deleted field instead of actually deleting
    const deletedProject = await Project.findByIdAndUpdate(
      req.body._id,
      { deleted: true },
      { new: true }
    );
    res.send({
      success: true,
      data: deletedProject,
      message: "Project marked as deleted",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

const addMemberToProject = async (req, res) => {
  try {
    const { email, role, projectId } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    await Project.findByIdAndUpdate(projectId, {
      $push: {
        members: {
          user: user._id,
          role,
        },
      },
    });

    res.send({
      success: true,
      message: "Member added successfully",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

const removeMemberFromProject = async (req, res) => {
  try {
    const { memberId, projectId } = req.body;

    const project = await Project.findById(projectId);
    project.members.pull(memberId);
    await project.save();

    res.send({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectsByRole,
  editProject,
  deleteProject,
  addMemberToProject,
  removeMemberFromProject,
};
