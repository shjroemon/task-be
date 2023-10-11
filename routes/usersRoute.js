const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/usersControllers");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logged-in-user", authMiddleware, userController.getLoggedInUser);

module.exports = router;
