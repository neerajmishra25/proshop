const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", userController.registerUser);
router.post("/login", userController.authUser);
router.get("/profile", protect, userController.getUserProfile);
router.get("/", protect, admin, userController.getAllUsers);
router.put("/profile", protect, userController.updateUserProfile);

module.exports = router;
