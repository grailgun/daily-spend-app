const userController = require("../../controllers/user.controller");

const router = require("express").Router();

router.get("/", userController.GetAllUsers);
router.delete("/logout", userController.LogoutUser);

module.exports = router;
