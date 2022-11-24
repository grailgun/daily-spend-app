const router = require("express").Router();
const walletController = require("../../controllers/walletController.js");

router.get("/", walletController.getWallet);
router.get("/:id", walletController.getWalletById);
router.post("/", walletController.addWallet);
router.put("/:id", walletController.modifyWallet);
router.delete("/:id", walletController.deleteWallet);

module.exports = router;
