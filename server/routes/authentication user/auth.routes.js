const { signUp, signIn } = require("../../controllers/auth.controller");
const verifySignUp = require("../../middleware/verifySignUp");

const router = require("express").Router();

router.post("/signUp", verifySignUp.CheckDuplicate, signUp);
router.post("/signIn", signIn);

module.exports = router;