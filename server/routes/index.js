const router = require("express").Router();

const wallet = require("./modules/walletsRouter.js");
const spend = require("./modules/spendsRouter.js");

router.use("/wallets", wallet);
router.use("/spends", spend);

module.exports = router;
