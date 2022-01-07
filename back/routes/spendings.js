const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Spending = require("../models/Spending");
const { validateToken } = require("../utils/JWT");

//todo check that the user is ok
router.post("/", validateToken, async (req, res) => {
	try {
		const { categoryId, date, name, amount, comment } = req.body;
		const { username } = req.tokenPayload;
		const isCategoryOwner = await Category.findOne({
			_id: categoryId,
			owner: username,
		});

		if (isCategoryOwner) {
			const spending = new Spending({
				category: categoryId,
				date,
				name,
				amount,
				comment,
			});
			await spending.save();

			res.status(200).json("La dépense a bien été ajoutée.");
		} else {
			console.log("Can't save it !");
			res.status(500).json("An error occured ...");
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("An error occured ...");
	}
});

router.get("/all/:categoryId", validateToken, async (req, res) => {
	try {
		const { categoryId } = req.params;
		const { username } = req.tokenPayload;

		const isCategoryOwner = await Category.findOne({
			_id: categoryId,
			owner: username,
		});

		if (isCategoryOwner) {
			const ObjectId = mongoose.Types.ObjectId;
			const spendings = await Spending.aggregate([
				{
					$match: {
						category: ObjectId(categoryId),
					},
				},
				{
					$set: {
						date: {
							$dateToString: {
								format: "%d-%m-%Y",
								date: "$date",
							},
						},
					},
				},
			]);
			console.log(spendings);

			res.status(200).json(spendings);
		} else {
			res
				.status(401)
				.json("Oops, you are not authorized to see this category's spendings.");
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("An error occured ...");
	}
});

router.delete("/:spendingId", validateToken, async (req, res) => {
	try {
		//check isOwner
		const { spendingId } = req.params;
		const spendingToDelete = await Spending.findOneAndDelete({
			_id: spendingId,
		});
		console.log(spendingToDelete);
		res.status(200).json("La dépense a bien été supprimée.");
	} catch (error) {
		console.log(error);
		res.status(500).json("An error occured ...");
	}
});

router.put("/", async (req, res) => {
	try {
		//check isOwner
		const { _id, name, amount, comment } = req.body;
		const filter = { _id: _id };
		const update = { name, amount, comment };
		const editSpending = await Spending.findOneAndUpdate(filter, update, {
			new: true,
		});
		res.status(200).json("La dépense a bien été modifiée.");
	} catch (error) {
		console.log(error);
		res.status(500).json("An error occured ...");
	}
});

module.exports = router;
