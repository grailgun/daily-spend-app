const router = require("express").Router();
const userController = require("../../controllers/user auth/user.controller");

router.get("/", userController.GetAllUsers);
router.delete("/logout", userController.LogoutUser);

module.exports = router;
