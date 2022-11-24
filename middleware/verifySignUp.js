const { User } = require("../models");

const checkDuplicateUserAndEmail = async (req, res, next) => {
	User.findOne({
        attributes: [
            'id'
        ],
		where: {
			username: req.body.username,
		},
	})
		.then((user) => {
			if (user) {
				return res.status(400).send({
					message: "Failed! User is already exists!",
				});
			}

			next();
		})
		.catch((error) => {
			console.log(error);
			return res.json(error);
		});
};

const verifySignUp = {
	CheckDuplicate: checkDuplicateUserAndEmail,
};

module.exports = verifySignUp;
