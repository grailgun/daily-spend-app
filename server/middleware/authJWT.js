const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyToken = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) {
		return res.json({
			message: "No Token Provided",
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

const refreshToken = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		res.status(403);
	}

	User.findOne({
		where: {
			refresh_token: refreshToken,
		},
	})
		.then((user) => {
			jwt.verify(refreshToken, process.env.REFRESH_KEY, (error, decoded) => {
				if (error) res.sendStatus(403);
				const payload = {
					id: decoded.id,
					name: decoded.username,
				};
				const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
					expiresIn: "30s",
				});
				res.json({
					access_token: accessToken,
				});
			});
		})
		.catch((error) => {
			console.log(error);
			res.sendStatus(403);
		});
};

const authUser = {
	VerifyToken: verifyToken,
	RefreshToken: refreshToken
};

module.exports = authUser;
