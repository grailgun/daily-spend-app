const router = require("express").Router();

const walletRoute = require("./modules/wallets.routes");
const spendRoute = require("./modules/spends.routes");
const authRoute = require("./authentication user/auth.routes");
const userRoute = require("./authentication user/user.routes");
const { refreshToken } = require("../controllers/user auth/auth.controller");
const { VerifyToken } = require("../middleware/authJWT.js");

router.use("/auth", authRoute);

router.use("/users", VerifyToken, userRoute);
router.use("/wallets", VerifyToken, walletRoute);
router.use("/spends", VerifyToken, spendRoute);

router.get("/token", refreshToken);

module.exports = router;
