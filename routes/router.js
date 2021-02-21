"use strict";

const router = require("express").Router(),
	mainController = require("../controllers/mainController"),
	authenticate = require('../config/middlewares/authenticate');

router.get('/', authenticate, mainController.toHome);

router.use('/account', require('./userRoutes'))

module.exports = router;