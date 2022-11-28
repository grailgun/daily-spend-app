const router = require("express").Router();
const { signUp, signIn } = require("../../controllers/user auth/auth.controller");
const { check } = require("express-validator");

router.post("/signUp", signUp);
router.post("/signIn", [
    check("username").notEmpty().withMessage('username should not be null'),
    check("password").notEmpty().withMessage('password should not be null')
], signIn);

module.exports = router;