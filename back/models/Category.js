const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	objective: {
		type: Number,
		default: 200,
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
