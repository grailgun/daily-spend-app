"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable("wallets", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			wallet_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			wallet_initial_amount: {
				type: DataTypes.DECIMAL,
				defaultValue: 0,
			},
			wallet_amount: {
				type: DataTypes.DECIMAL,
				defaultValue: 0,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable("wallets");
	},
};
