"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Wallet }) {
			this.hasMany(Wallet, {
				foreignKey: "user_id",
			});
		}

		toJSON() {
			return {
				...this.get(),
				password: undefined,
			};
		}
	}

	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			refresh_token: {
				type: DataTypes.TEXT,
			},
		},
		{
			sequelize,
			tableName: "users",
			modelName: "User",
		}
	);
	return User;
};
