'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('spends', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      walletId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('spends');
  }
};