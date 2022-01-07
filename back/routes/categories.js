const express = require("express");

const router = express.Router();
const Category = require("../models/Category");
const { validateToken } = require("../utils/JWT");

router.get("/all/:username", validateToken, async (req, res) => {
	try {
		const { username } = req.tokenPayload;
		const categories = await Category.aggregate([
			{
				$match: {
					owner: username,
				},
			},
			{
				$lookup: {
					from: "spendings",
					localField: "_id",
					foreignField: "category",
					as: "categories",
				},
			},
			{
				$project: {
					name: 1,
					totalSpending: {
						$sum: "$categories.amount",
					},
				},
			},
		]);
		res.status(200).json(categories);
	} catch (error) {
		console.log(error);
		res.status(500).json("An error occured ...");
	}
});

router.post("/", validateToken, async (req, res) => {
	try {
		const { categoryName } = req.body;
		const { username } = req.tokenPayload;

		const category = await Category.findOne({ name: categoryName });
		console.log(category);
		if (category) {
			res.status(409).json("La catégorie existe déjà.");
		}

		const newCategory = new Category({
			name: categoryName,
			owner: username,
		});
		await newCategory.save();

		res.status(200).json("La catégorie a bien été créée.");
	} catch (error) {
		console.log(error);
		res.status(500).json("An error occured ...");
	}
});

//todo
router.patch("/:categoryName/:username", async (req, res) => {
	try {
		const { userId, categoryName } = req.body;
		const user = await User.findById(userId);
		console.log(user.categories);
		if (!user.categories.includes(categoryName)) {
			console.log("in");
			await user.updateOne({
				$push: { categories: categoryName },
			});
		}
		console.log(user);

		res.status(200).send(true);
	} catch (error) {
		console.log(error);
		res.status(500).json("An error occured ...");
	}
});

module.exports = router;