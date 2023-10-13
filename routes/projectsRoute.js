const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
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

router.post("/create-project", authMiddleware, createProject);
router.post("/all-projects", authMiddleware, getAllProjects);
router.post("/project-by-id", authMiddleware, getProjectById);
router.post("/projects-by-role", authMiddleware, getProjectsByRole);
router.post("/edit-project", authMiddleware, editProject);
router.post("/delete-project", authMiddleware, deleteProject);
router.post("/add-member", authMiddleware, addMemberToProject);
router.post("/remove-member", authMiddleware, removeMemberFromProject);

module.exports = router;
