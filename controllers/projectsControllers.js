const Project = require("../models/projectModel");
const User = require("../models/userModel");

// Controller for creating a project
const createProject = async (req, res) => {
  try {
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

// Controller for getting all projects
const getAllProjects = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    const projects = await Project.paginate(
      { owner: req.body.userId },
      options
    );
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

// Controller for getting a project by ID
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

// Controller for getting projects by role
const getProjectsByRole = async (req, res) => {
  try {
    const userId = req.body.userId;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    const projects = await Project.paginate(
      { "members.user": userId },
      options
    );
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

// Controller for editing a project
const editProject = async (req, res) => {
  try {
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

// Controller for deleting a project
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

// Controller for adding a member to a project
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

// Controller for removing a member from a project
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
