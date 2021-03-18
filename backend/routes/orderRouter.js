const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, orderController.addOrderItems);
router.get("/:id", protect, orderController.getOrderById);

module.exports = router;
