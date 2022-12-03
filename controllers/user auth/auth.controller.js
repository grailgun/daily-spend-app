const { User } = require("../../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

async function signUp(req, res) {
	const { username, password } = req.body;

	User.findOne({
		attributes: ["id"],
		where: {
			username: username,
		},
	})
		.then((user) => {
			if (user) {
				return res.status(400).json({
					errors: {
						message: ["User is already exists!"],
					},
				});
			}

			User.create({
				username: username,
				password: bcrypt.hashSync(password, 8),
			})
				.then((user) => {
					return res.json({
						message: "Create user success",
						data: user,
					});
				})
				.catch((error) => {
					console.log(error);
					return res.json(error);
				});
		})
		.catch((error) => {
			console.log(error);
			return res.json(error);
		});
}

async function signIn(req, res) {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

	const { username, password } = req.body;

	User.findOne({
		attributes: ["id", "username", "password"],
		where: {
			username: username,
		},
	})
		.then((user) => {
			const isMatch = bcrypt.compareSync(password, user.password);

			if (!isMatch) {
				return res.status(401).send({
					errors: {
						password: ["Invalid password"],
					},
				});
			}

			const payload = {
				id: user.id,
				name: user.username,
			};

			const accessToken = createToken(payload, process.env.SECRET_KEY, "100m");

			const refreshToken = createToken(
				payload,
				process.env.REFRESH_KEY,
				"100m"
			);

			User.update(
				{
					refresh_token: refreshToken,
				},
				{
					where: {
						username: user.username,
					},
				}
			)
				.then((updateStatus) => {
					res.cookie("refreshToken", refreshToken, {
						httpOnly: true,
						maxAge: 24 * 60 * 60 * 1000,
					});

					return res.json({
						token: accessToken,
					});
				})
				.catch((errorUpdate) => {
					console.log(errorUpdate);
					return res.json({
						errors: {
							message: ["Error when store refresh token"],
						},
					});
				});
		})
		.catch((error) => {
			console.log(error);
			return res.json({
				errors: {
					message: ["User not registered"],
				},
			});
		});
}

async function refreshToken(req, res) {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		res.sendStatus(403);
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

				const accessToken = createToken(
					payload,
					process.env.SECRET_KEY,
					"100m"
				);
				res.json({
					access_token: accessToken,
				});
			});
		})
		.catch((error) => {
			console.log(error);
			res.sendStatus(403);
		});
}

function createToken(payload, key, expiredTime) {
	return jwt.sign(payload, key, {
		expiresIn: expiredTime,
	});
}

module.exports = {
	signUp,
	signIn,
	refreshToken,
};
