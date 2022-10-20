const router = require("express").Router();

const walletController = require("../../controllers/walletController.js");

router.use((req, res, next) => {
	console.log("Request to wallet route at " + Date.now());
	next();
});

router.get("/", walletController.getWallet);
router.get("/:id", walletController.getWalletById)
router.post("/", walletController.addWallet);

module.exports = router;
