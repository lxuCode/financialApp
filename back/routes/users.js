const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../models/User");
const { createToken, validateToken } = require("../utils/JWT");

router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();
		res.status(200).json("Votre compte a bien été créé.");
	} catch (err) {
		res.status(500).json("An error occured ...");
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (user) {
			const isPasswordValid = await bcrypt.compare(password, user.password);
			!isPasswordValid && res.send(400).json("Username / password incorrect !");

			const accessToken = createToken(user);
			res
				.status(200)
				.cookie("access-token", accessToken, {
					maxAge: 1000 * 60 * 60 * 24,
					httpOnly: true,
				})
				.json(username);
		} else {
			res.status(400).send("User does not exist ...");
		}
	} catch (err) {
		console.log(err);
	}
});

router.post("/logout", validateToken, (req, res) => {
	console.log("logout");
	//we don't check if cookie is really destroyed on client side !
	res.status(200).clearCookie("access-token", { httpOnly: true }).json(true);
});

router.get("/isAuthenticated", validateToken, (req, res) => {
	res.status(200).json(true);
});

module.exports = router;
