const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, orderController.addOrderItems);
router.get("/myorders", protect, orderController.getMyOrders);
router.get("/:id", protect, orderController.getOrderById);
router.put("/:id/pay", protect, orderController.updateOrderToPaid);

module.exports = router;
