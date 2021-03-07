const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", userController.registerUser);
router.post("/login", userController.authUser);
router.get("/profile", protect, userController.getUserProfile);

module.exports = router;
