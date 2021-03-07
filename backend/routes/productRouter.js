const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const handleAsync = require("async-error-handler");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

module.exports = router;
