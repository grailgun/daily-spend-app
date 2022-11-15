const router = require("express").Router();

const spendController = require("../../controllers/spendController.js");

router.post("/", spendController.addSpend);
router.get("/", spendController.getAllSpend);
router.delete("/:id", spendController.deleteSpend);

module.exports = router;
