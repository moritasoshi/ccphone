"use strict";

const User = require("../models/user"),
	passport = require("passport"),
	getUserParams = body => {
		return {
			email: body.email,
			password: body.password,
			roomId: Math.random().toString(32).substring(2)
		};
	};

module.exports = {
	toRegister: (req, res) => {
		res.render("./account/register.ejs");
	},
	register: async (req, res) => {
		const newUser = new User(getUserParams(req.body));

		const locals = {
			errors: [],
			original: req.body
		}

		// validations
		if (!newUser.email || newUser.email.indexOf('@') === -1) {
			locals.errors.push({
				value: '',
				msg: '正しいメールアドレスを入力してください',
				param: 'email',
				location: 'server'
			})
		} else if (!newUser.password) {
			locals.errors.push({
				value: '',
				msg: 'メールアドレスを入力してください',
				param: 'email',
				location: 'server'
			})
		} else if (await User.findOne({email: newUser.email})) {
			locals.errors.push({
				value: '',
				msg: '登録済みのメールアドレスです',
				param: 'email',
				location: 'db'
			})
		}

		if (locals.errors.length !== 0) { // バリデーション失敗
			return res.render('./account/register.ejs', locals);
		}

		// register the user
		await newUser.save().catch(err => {
			locals.errors.push({
				value: '',
				msg: 'ユーザー情報を登録できませんでした',
				param: 'email',
				location: 'db'
			})
			return res.render('./account/register.ejs', locals);
		})


		res.redirect('/account/login');
	},
	toLogin: (req, res) => {
		const flash = req.flash('error')
		const message = {
			message: flash
		}
		res.render("./login.ejs", message);
	},
	login: passport.authenticate('local', {
		failureRedirect: "/account/login",
		failureFlash: true,
		successRedirect: "/",
		session: true
	}),
	logout: (req, res) => {
		req.logout();
		res.redirect('/');
	}
}
