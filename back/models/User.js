const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	categories: {
		type: [String],
		default: [],
	},
});

module.exports = mongoose.model("Users", UserSchema);
