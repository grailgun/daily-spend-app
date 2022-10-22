const { Wallet } = require("../models");

// Get all wallet from database
const getWallet = async (req, res) => {
	try {
		const wallets = await Wallet.findAll({ include: "spends" });
		return res.json(wallets);
	} catch (error) {
		console.log(error);
		return res.status(404).json(error);
	}
};

// Get wallet by id from params id
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

// Can add wallet to database and if wallet already exist, return is exist feedback
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

const modifyWallet = async (req, res) => {
	const id = req.params.id;
	const walletAmount = req.body.walletAmount;

	try {
		await Wallet.update(
			{
				wallet_amount: parseFloat(walletAmount),
			},
			{
				where: {
					id: id,
				},
			}
		);

		return res.json({
			message: "Success update the wallet",
		});
	} catch (error) {
		console.log(error);
		return res.json(error);
	}
};

const deleteWallet = async (req, res) => {
	const id = req.params.id;

	Wallet.destroy({
		where: { id: id },
	})
		.then((result) => {
			if (result == 0) {
				res.json({
          message: "Wallet is not exist!",
        });
			} else {
        res.json({
          message: "Successfully delete the wallet : " + id ,
        });        
			}
		})
		.catch((error) => {
			res.json(error);
		});
};

module.exports = {
	addWallet,
	getWallet,
	getWalletById,
	modifyWallet,
	deleteWallet,
};
