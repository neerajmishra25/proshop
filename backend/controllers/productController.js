const Product = require("../model/productModel");
const asyncHandler = require("express-async-handler");

exports.getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

exports.getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Prodcut not found");
	}
});

exports.deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: "Product Deleted" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});
