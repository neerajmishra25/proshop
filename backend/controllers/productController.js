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

exports.addProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample Name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "Sample Brand",
		category: "Sample Category",
		countInStock: 0,
		numReviews: 0,
		description: "Sample Description",
	});
	const createProduct = await product.save();
	res.status(201).json(createProduct);
});

exports.updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		image,
		description,
		brand,
		category,
		countInStock,
	} = req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.price = price;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
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
