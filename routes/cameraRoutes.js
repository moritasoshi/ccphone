const router = require("express").Router(),
	cameraController = require("../controllers/cameraController"),
	authenticate = require('../config/middlewares/authenticate');

router.get("/recording", authenticate, cameraController.recording);
router.get("/monitoring", authenticate, cameraController.monitoring);

module.exports = router;