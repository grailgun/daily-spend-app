const { where } = require("sequelize");
const { User } = require("../models");

const getAllUsers = async (req, res, next) => {
	User.findAll({
		attributes: [["username", "name"]],
	})
		.then((user) => {
			return res.json({
				data: user,
			});
		})
		.catch((error) => {
			console.log(error);
			return res.json(error);
		});
};

const logoutUser = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) return res.sendStatus(204);

	User.findOne({
		where: {
			refresh_token: refreshToken,
		},
	})
		.then((user) => {
			User.update(
				{
					refresh_token: null,
				},
				{
					where: {
						id: user.id,
					},
				}
			)
				.then((result) => {
					res.clearCookie("refreshToken");
					return res.sendStatus(200);
				})
				.catch((error) => {
					console.log(error);
					return res.json(error);
				});
		})
		.catch((error) => {
			console.log(error);
			return res.sendStatus(204);
		});
};

const userController = {
	GetAllUsers: getAllUsers,
	LogoutUser: logoutUser,
};

module.exports = userController;
