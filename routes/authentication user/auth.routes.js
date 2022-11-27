const router = require("express").Router();
const { signUp, signIn } = require("../../controllers/user auth/auth.controller");

router.post("/signUp", signUp);
router.post("/signIn", signIn);

module.exports = router;