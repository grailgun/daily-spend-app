const { Spend, Wallet, sequelize } = require("../models");

const getAllSpend = async (req, res) => {
	try {
		const spends = await Spend.findAll({ include: "wallet" });

		return res.json(spends);
	} catch (error) {
		console.log(error);
		return res.status(404).json(error);
	}
};

const addSpend = async (req, res) => {
	const { description, spendAmount, walletId } = req.body;

	try {
		const wallet = await Wallet.findOne({ where: { uuid: walletId } });
		if (!wallet) return res.status(404).json({ msg: "Wallet Not Found! " });

		//create new spend
		const newSpend = await Spend.create({
			description: description,
			spend_amount: parseFloat(spendAmount),
			spend_date: Date.now(),
			wallet_id: wallet.id,
		});

		return res.json(newSpend);
	} catch (error) {
		console.log(error);
		return res.status(404).json(error);
	}
};

module.exports = {
	addSpend, getAllSpend
};
