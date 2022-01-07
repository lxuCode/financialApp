const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	owner: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Categories", CategorySchema);
