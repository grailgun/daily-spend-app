const { Spend, Wallet, sequelize } = require("../models");

const getAllSpend = async (req, res) => {
	try {
		const spendInstance = await Spend.findAll({
			attributes: [
				"description",
				["spend_amount", "amount"],
				["spend_date", "date"],
			],
			include: [
				{
					model: Wallet,
					attributes: [
						["wallet_name", "name"],
						["wallet_amount", "amount"],
					],
				},
			],
		});
		return res.json(spendInstance);
	} catch (error) {
		console.log(error);
		return res.status(404).json(error);
	}
};

const addSpend = async (req, res) => {
	const { description, spendAmount, walletId } = req.body;

	try {
		const wallet = await Wallet.findOne({ where: { id: walletId } });
		if (!wallet) return res.status(404).json({ message: "Wallet Not Found! " });

		//create new spend
		const newSpend = await Spend.create({
			description: description,
			spend_amount: parseFloat(spendAmount),
			spend_date: Date.now(),
			wallet_id: wallet.id,
		});

		wallet.wallet_amount -= newSpend.spend_amount;
		wallet.save({ fields: ["wallet_amount"] }).then(() => {
			res.json({
				message: "Success add spend to wallet",
				spend: newSpend,
			});
		});
	} catch (error) {
		console.log(error);
		return res.json(error);
	}
};

const deleteSpend = async (req, res) => {
	const spendId = req.params.id;

	try {
		const spend = await Spend.findOne({
			where: {
				id: spendId,
			},
		});
		if (!spend) {
			return res.status(404).json({
				message: "Spend not found!",
			});
		}

		//Kalau punya spend kita dapatkan si wallet
		const wallet = await spend.getWallet();
		if (!wallet) {
			return res.status(404).json({
				message: "Spend not found!",
			});
		}
		wallet.wallet_amount += spend.spend_amount;
		wallet.save({ fields: ["wallet_amount"] });

		const deleteResult = await Spend.destroy({
			where: {
				id: spendId,
			},
		});

		if (deleteResult > 0) {
			res.json({
				message: "Success delete the spend",
			});
		}
	} catch (error) {
		res.json(error);
	}
};

function checkSpend(count, successMessage) {
	if (count == 0) {
		return {
			message: "Spend doesn't exist!",
		};
	} else {
		return {
			message: successMessage,
		};
	}
}

module.exports = {
	addSpend,
	getAllSpend,
	deleteSpend,
};
