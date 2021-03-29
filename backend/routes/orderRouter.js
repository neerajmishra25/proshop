const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, orderController.addOrderItems);
router.get("/myorders", protect, orderController.getMyOrders);
router.get("/", protect, admin, orderController.getOrders);
router.get("/:id", protect, orderController.getOrderById);
router.put("/:id/pay", protect, orderController.updateOrderToPaid);
router.put(
	"/:id/deliver",
	protect,
	admin,
	orderController.updateOrderToDelivered
);

module.exports = router;
