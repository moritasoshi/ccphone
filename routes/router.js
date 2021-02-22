"use strict";

const router = require("express").Router(),
	mainController = require("../controllers/mainController"),
	authenticate = require('../config/middlewares/authenticate');

// router.get('/', authenticate, mainController.toHome);
router.get('/', authenticate, (req, res) => {
	res.render('./camera/choice')
});

router.use('/account', require('./userRoutes'))
router.use('/camera', require('./cameraRoutes'))

module.exports = router;