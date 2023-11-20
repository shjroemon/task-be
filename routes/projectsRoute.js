const router = require("express").Router();
const projectsController = require("../controllers/projectsControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/create-project",
  authMiddleware,
  projectsController.createProject
);
router.get(
  "/get-all-projects",
  authMiddleware,
  projectsController.getAllProjects
);
router.get(
  "/get-project-by-id",
  authMiddleware,
  projectsController.getProjectById
);
router.get("/project/:id", authMiddleware, projectsController.getProjectById);
router.get(
  "/get-projects-by-role",
  authMiddleware,
  projectsController.getProjectsByRole
);
router.put("/edit-project", authMiddleware, projectsController.editProject);
router.delete(
  "/delete-project",
  authMiddleware,
  projectsController.deleteProject
);
router.post(
  "/add-member",
  authMiddleware,
  projectsController.addMemberToProject
);
router.post(
  "/remove-member",
  authMiddleware,
  projectsController.removeMemberFromProject
);

module.exports = router;
