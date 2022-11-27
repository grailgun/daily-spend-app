const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyToken = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) {
		return res.json({
			errors: {
				message: "No Token Provided",
			}
		});
	}

	jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
		if (error) {
			console.log(error);
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}

		req.user = {
			id: decoded.id,
			username: decoded.name,
		};
		next();
	});
};

const authUser = {
	VerifyToken: verifyToken
};

module.exports = authUser;
