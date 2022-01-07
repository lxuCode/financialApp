const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
	try {
		const accessToken = sign(
			{ username: user.username },
			process.env.JWT_SECRET_KEY
		);

		return accessToken;
	} catch (error) {
		console.log(error);
	}
};

const validateToken = (req, res, next) => {
	const accessToken = req.cookies["access-token"];
	if (!accessToken) {
		res.status(401).json("You are not authorized to access the resource !");

		return;
	}
	try {
		const validToken = verify(accessToken, process.env.JWT_SECRET_KEY);
		if (validToken) {
			req.tokenPayload = validToken;
			console.log(validToken);
			next();

			return;
		}
	} catch (err) {
		return res.status(400).json("Authentication failed !");
	}
};

module.exports = { createToken, validateToken };
