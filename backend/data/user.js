const bycrypt = require("bcryptjs");
const users = [
	{
		name: "admin_user",
		email: "admin@gmail.com",
		password: bycrypt.hashSync("123456", 10),
		isAdmin: true,
	},
	{
		name: "John Doe",
		email: "john@gmail.com",
		password: bycrypt.hashSync("123456", 10),
	},
	{
		name: "Jan Doe",
		email: "jan@gmail.com",
		password: bycrypt.hashSync("123456", 10),
	},
];

module.exports = users;
