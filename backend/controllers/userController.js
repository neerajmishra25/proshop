const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const { findOne } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

const genToken = (id) => {
	let token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
	return token;
};
exports.registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExists = await User.findOne({ email });
	if (!userExists) {
		const salt = await bycrypt.genSalt(10);
		const passwordHash = await bycrypt.hash(password, salt);
		const user = await User.create({
			name,
			email,
			password: passwordHash,
		});
		if (user) {
			return res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: genToken(user._id),
			});
		} else {
			res.status(400);
			throw new Error("Invalid User Data");
		}
	} else {
		res.status(400);
		throw new Error("User Already Exists");
	}
});

exports.authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		const checkPass = await bycrypt.compare(password, user.password);
		if (checkPass) {
			return res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: genToken(user._id),
			});
		} else {
			res.status(401);
			throw new Error("Invalid username or password");
		}
	} else {
		res.status(400);
		throw new Error("Invalid username or password");
	}
});

exports.getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		return res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User Not Found");
	}
});
