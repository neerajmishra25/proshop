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
		isDelivered,
	} = req.body;
	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No Order Items");
	} else {
		const order = new Order({
			orderItems,
			shippingAddress,
			user: req.user._id,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			isDelivered,
		});
		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

exports.getOrderById = asyncHandler(async (req, res) => {
	const orderId = req.params.id;
	const order = await Order.findById(orderId).populate("user", "name email");
	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order Not Found");
	}
});

exports.updateOrderToPaid = asyncHandler(async (req, res) => {
	const orderId = req.params.id;
	const order = await Order.findById(orderId);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		const updateOrder = await order.save();
		res.json(updateOrder);
	} else {
		res.status(404);
		throw new Error("Order Not Found");
	}
});

exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
	const orderId = req.params.id;
	const order = await Order.findById(orderId);
	if (order) {
		order.isDelivered = true;
		order.isDeliveredAt = Date.now();
		const updateOrder = await order.save();
		res.json(updateOrder);
	} else {
		res.status(404);
		throw new Error("Order Not Found");
	}
});

exports.getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

exports.getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate("user", "id name");
	res.json(orders);
});
