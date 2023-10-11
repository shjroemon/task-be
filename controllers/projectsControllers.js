const Project = require("../models/projectModel");
const User = require("../models/userModel");
const {
  validateCreateProject,
  validateEditProject,
} = require("../utils/validationProjectRoute");

const createProject = async (req, res) => {
  try {
    const { error } = validateCreateProject(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        error: error.details[0].message,
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
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;

    const projects = await Project.find({ owner: req.body.userId })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    res.send({
      success: true,
      data: projects,
      currentPage: page,
      pageSize: pageSize,
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
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;

    const projects = await Project.find({ "members.user": userId })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("owner");

    res.send({
      success: true,
      data: projects,
      currentPage: page,
      pageSize: pageSize,
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
    const { error } = validateEditProject(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        error: error.details[0].message,
      });
    }

    await Project.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      success: true,
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
    await Project.findByIdAndDelete(req.body._id);
    res.send({
      success: true,
      message: "Project deleted successfully",
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
