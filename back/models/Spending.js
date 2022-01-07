const mongoose = require("mongoose");

const SpendingSchema = mongoose.Schema({
	category: {
		type: mongoose.ObjectId,
		require: true,
	},
	date: {
		type: Date,
		require: true,
	},
	name: {
		type: String,
		require: true,
	},
	amount: {
		type: Number,
		require: true,
	},
	comment: {
		type: String,
	},
});

module.exports = mongoose.model("Spendings", SpendingSchema);
