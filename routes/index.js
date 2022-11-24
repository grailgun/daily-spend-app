const router = require("express").Router();

const walletRoute = require("./modules/wallets.routes");
const spendRoute = require("./modules/spends.routes");
const authRoute = require("./authentication user/auth.routes");
const userRoute = require("./authentication user/user.routes");
const authUser = require("../middleware/authJWT.js");

router.use("/auth", authRoute);

router.use("/users", authUser.VerifyToken, userRoute);
router.use("/wallets", authUser.VerifyToken, walletRoute);
router.use("/spends", authUser.VerifyToken, spendRoute);

router.get("/token", authUser.RefreshToken);

module.exports = router;