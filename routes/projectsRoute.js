const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectsByRole,
  editProject,
  deleteProject,
  addMemberToProject,
  removeMemberFromProject,
} = require("../controllers/projectsControllers");

// Create a project
router.post("/create-project", authMiddleware, createProject);

// Get all projects
router.get("/all-projects", authMiddleware, getAllProjects);

// Get project by id
router.get("/project/:id", authMiddleware, getProjectById);

// Get projects by role
router.get("/projects-by-role", authMiddleware, getProjectsByRole);

// Edit a project
router.put("/edit-project/:id", authMiddleware, editProject);

// Delete a project
router.delete("/delete-project/:id", authMiddleware, deleteProject);

// Add a member to a project
router.post("/add-member", authMiddleware, addMemberToProject);

// Remove a member from a project
router.delete("/remove-member", authMiddleware, removeMemberFromProject);

module.exports = router;
