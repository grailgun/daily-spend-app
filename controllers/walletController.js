const { Wallet, Spend, User } = require("../models");

// Get all wallet from database
const getWallet = async (req, res) => {
	try {
		const wallets = await Wallet.findAll({
			attributes: ["wallet_name", "wallet_amount"],
			where: {
				user_id: req.user.id,
			},
		});

		if(wallets.length === 0){
			return res.json({
				message: "No Wallet",
				data : wallets
			});	
		}

		return res.json({
			message: "Success",
			data : wallets
		});
	} catch (error) {		
		return res.status(404).json(error);
	}
};

// Get wallet by id from params id
const getWalletById = async (req, res) => {
	const id = req.params.id;
	try {
		const wallet = await Wallet.findOne({
			attributes: ["id", ["wallet_name", "name"], ["wallet_amount", "amount"]],
			where: { id: id },
			include: Spend,
		});

		console.log(await wallet.getSpends());
		if (!wallet) return res.status(404).json({ message: "Wallet not found" });

		return res.json({
			data: wallet,
		});
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
				user_id: req.user.id,
			},
		});

		if (!isCreated)
			return res.status(202).json({
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
		const result = await Wallet.update(
			{
				wallet_amount: parseFloat(walletAmount),
			},
			{
				where: {
					id: id,
				},
			}
		);
		res.json(checkWallet(result, "Success update the wallet!"));
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
			res.json(checkWallet(result, "Success to delete the wallet!"));
		})
		.catch((error) => {
			res.json(error);
		});
};

function checkWallet(count, successMessage) {
	if (count == 0) {
		return {
			message: "Wallet doesn't exist!",
		};
	} else {
		return {
			message: successMessage,
		};
	}
}

module.exports = {
	addWallet,
	getWallet,
	getWalletById,
	modifyWallet,
	deleteWallet,
};
