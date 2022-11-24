const router = require("express").Router();

const { signUp, signIn } = require("../../controllers/user auth/auth.controller");
const verifySignUp = require("../../middleware/verifySignUp");

router.post("/signUp", verifySignUp.CheckDuplicate, signUp);
router.post("/signIn", signIn);

module.exports = router;