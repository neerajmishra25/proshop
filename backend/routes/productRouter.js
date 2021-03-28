const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const handleAsync = require("async-error-handler");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", protect, admin, productController.deleteProduct);

module.exports = router;
