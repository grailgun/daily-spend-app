"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Spend extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Wallet }) {
			// define association here
			this.belongsTo(Wallet, {
				foreignKey: "wallet_id"
			});
		}

    getWallets(){
      console.log("Hello");
    }

		toJSON() {
			return {
				...this.get(),
				walletId: undefined,
			};
		}
	}
	Spend.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			description: {
				type: DataTypes.TEXT,
				defaultValue: "Unknown spend",
			},
			spend_amount: {
				type: DataTypes.DECIMAL,
				defaultValue: 0,
			},
			spend_date: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			tableName: "spends",
			modelName: "Spend",
		}
	);
	return Spend;
};
