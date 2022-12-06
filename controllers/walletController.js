const apiResponse = require("../helpers/apiResponse");
const { Wallet, Spend, User } = require("../models");

// Get all wallet from database
const getWallet = async (req, res) => {
	try {
		const wallets = await Wallet.findAll({
			attributes: [
				["uuid", "wallet_id"],
				["wallet_name", "name"],
				["wallet_amount", "amount"],
			],
			where: {
				user_id: req.user.id,
			},
		});

		return apiResponse.successResponseWithData(res, "Success", wallets);
	} catch (error) {
		apiResponse.errorResponse(res, error);
	}
};

// Get wallet by id from params id
const getWalletById = async (req, res) => {
	const id = req.params.id;
	try {
		const wallet = await Wallet.findOne({
			attributes: [
				["uuid", "wallet_id"],
				["wallet_name", "name"],
				["wallet_amount", "amount"],
			],
			where: {
				uuid: id,
				user_id: req.user.id,
			},
			include: Spend,
		});

		if (!wallet) return apiResponse.notFoundError(res, "Wallet not found");

		return apiResponse.successResponseWithData(res, "Success", wallet);
	} catch (error) {
		return apiResponse.errorResponse(res, error);
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

		if (!isCreated) {
			return apiResponse.validationErrorWithData(res, "You already created this wallet", wallet);
		}

		return apiResponse.successResponseWithData(res, "Success create wallet", wallet);
	} catch (error) {
		return apiResponse.errorResponse(res, error);
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
					uuid: id,
				},
			}
		);
		return apiResponse.successResponse(res, "Success update the wallet!");
	} catch (error) {
		console.log(error);
		return apiResponse.errorResponse(res, error);
	}
};

const deleteWallet = async (req, res) => {
	const id = req.params.id;

	Wallet.destroy({
		where: {
			uuid: id,
			user_id: req.user.id,
		},
	})
		.then((result) => {
			return apiResponse.successResponse(res, "Success delete wallet");
		})
		.catch((error) => {
			return apiResponse.errorResponse(res, error);
		});
};

module.exports = {
	addWallet,
	getWallet,
	getWalletById,
	modifyWallet,
	deleteWallet,
};
