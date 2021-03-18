const Order = require("../model/orderModel");
const asyncHandler = require("express-async-handler");

exports.addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;
	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No Order Items");
	} else {
		const order = new Order({
			orderItems,
			shippingAddress,
			user: req.user_id,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});
		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

// exports.getProductById = asyncHandler(async (req, res) => {
// 	const product = await Product.findById(req.params.id);
// 	if (product) {
// 		res.json(product);
// 	} else {
// 		res.status(404);
// 		throw new Error("Prodcut not found");
// 	}
// });
