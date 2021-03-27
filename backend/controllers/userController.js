const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const { findOne } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

const genPassHash = async (password) => {
	const salt = await bycrypt.genSalt(10);
	const passwordHash = await bycrypt.hash(password, salt);
	return passwordHash;
};
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
		// const salt = await bycrypt.genSalt(10);
		const passwordHash = await genPassHash(password);
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

exports.updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = await genPassHash(req.body.password);
		}

		const updatedUser = await user.save();
		return res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: genToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User Not Found");
	}
});

exports.getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

exports.getUserById = asyncHandler(async (req, res) => {
	const user = await User.find(req.params.id).select("-password");
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User does not exist");
	}
});

exports.updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;
		const updatedUser = await user.save();
		return res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User does not exist");
	}
});

exports.deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		await user.remove();
		res.json({ message: "User Deleted" });
	} else {
		res.status(404);
		throw new Error("User does not exist");
	}
});
