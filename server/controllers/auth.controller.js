const { User } = require("../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
	const { username, password } = req.body;

	User.create({
		username: username,
		password: bcrypt.hashSync(password, 8),
	})
		.then((user) => {
			return res.json({
				message: "Create user ise success",
				data: user,
			});
		})
		.catch((error) => {
			console.log(error);
			return res.json(error);
		});
};

const signIn = async (req, res) => {
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
					message: "Invalid password",
				});
			}
			
			const payload = {
				id: user.id,
				name: user.username,
			};

			const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
				expiresIn: "10m",
			});

			const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {
				expiresIn: "1m",
			});

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
						access_token: accessToken,
					});
				})
				.catch((errorUpdate) => {
					console.log(errorUpdate);
					return res.json({
						message: "Error when store refresh token",
					});
				});
		})
		.catch((error) => {
			console.log(error);
			return res.json({
				message: "User not registered",
			});
		});
};

module.exports = {
	signUp,
	signIn,
};
