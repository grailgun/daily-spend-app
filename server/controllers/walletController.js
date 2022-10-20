const { Wallet } = require("../models");

const getWallet = async (req, res) => {
	try {
		const wallets = await Wallet.findAll({ include: 'spends' });
		return res.json(wallets);
	} catch (error) {
		return res.status(404).json(error);
	}
};

const addWallet = async (req, res) => {
	const { walletName, walletAmount } = req.body;
	try {
		const createdWallet = await Wallet.create({
			wallet_name: walletName,
			wallet_amount: parseInt(walletAmount),
		});

		return res.json(createdWallet);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const getWalletById = async (req, res) => {
	const id = req.params.id;
	try {
		const wallet = await Wallet.findOne({
			where: {
				id: id,
			},
		});

		if (!wallet) return res.status(404).json({ msg: "Wallet not found" });
    
		return res.json(wallet);
	} catch (error) {
		return res.status(404).json(error);
	}
};

module.exports = {
	addWallet,
	getWallet,
	getWalletById,
};
