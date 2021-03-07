const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

exports.protect = asyncHandler(async (req, res, next) => {
	let token = req.headers.authorization;
	if (token && token.startsWith("Bearer")) {
		try {
			token = token.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select("-password");
		} catch (error) {
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized, No token");
	}
	next();
});
