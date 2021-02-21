"use strict";

const User = require("../models/user"),
	passport = require("passport"),
	getUserParams = body => {
		return {
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			password: body.password,
			zipCode: body.zipCode
		};
	};

module.exports = {
	toLogin: (req, res) => {
		const flash = req.flash('error')
		const message = {
			message: flash
		}
		res.render("./login.ejs", message);
	},
	login: passport.authenticate('local', {
		failureRedirect: "/login",
		failureFlash: true,
		successRedirect: "/",
		session: true
	}),
	logout: (req, res) => {
		req.logout();
		res.redirect('/');
	}
}
