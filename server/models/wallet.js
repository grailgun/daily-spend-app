"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Wallet extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Spend }) {
			// define association here
			this.hasMany(Spend, {
				foreignKey: "walletId",
				as: "spends",
			});
		}

		toJSON() {
			return {
				...this.get(),
				id: undefined,
				createdAt: undefined,
				updatedAt: undefined,
			};
		}
	}
	Wallet.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			wallet_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			wallet_amount: {
				type: DataTypes.DECIMAL,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			tableName: "wallets",
			modelName: "Wallet",
		}
	);
	return Wallet;
};
