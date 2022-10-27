const router = require("express").Router();

const spendController = require("../../controllers/spendController.js");

router.use((req, res, next) => {
	console.log("Request to spends route at " + Date.now());
	next();
});

router.post("/", spendController.addSpend);
router.get("/", spendController.getAllSpend);
router.delete("/:id", spendController.deleteSpend);

module.exports = router;
