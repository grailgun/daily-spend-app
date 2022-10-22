const { Wallet } = require("../models");

const getWallet = async (req, res) => {
	try {
		const wallets = await Wallet.findAll({ include: "spends" });
		return res.json(wallets);
	} catch (error) {
		console.log(error);
		return res.status(404).json(error);
	}
};

const addWallet = async (req, res) => {
	const { walletName, walletAmount } = req.body;
	const amount = parseFloat(walletAmount);

	try {
		const [wallet, isCreated] = await Wallet.findOrCreate({
			where: {
				wallet_name: walletName,
			},
			defaults: {
				wallet_initial_amount: amount,
				wallet_amount: amount,
			},
		});

		if (!isCreated)
			return res.json({
				msg: "You already created this wallet",
				wallet: wallet,
			});

		return res.json(wallet);
	} catch (error) {
		return res.json(error);
	}
};

const getWalletById = async (req, res) => {
	const id = req.params.id;
	try {
		const wallet = await Wallet.findOne({
			where: { id: id },
			include: "spends",
		});

		if (!wallet) return res.status(404).json({ msg: "Wallet not found" });

		return res.json(wallet);
	} catch (error) {
		return res.send(error);
	}
};

module.exports = {
	addWallet,
	getWallet,
	getWalletById,
};
