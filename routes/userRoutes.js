const router = require("express").Router(),
	userController = require("../controllers/userController"),
	authenticate = require('../config/middlewares/authenticate');

router.get("/login", userController.toLogin);
router.get("/register", userController.toRegister);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", authenticate ,userController.logout);

module.exports = router;