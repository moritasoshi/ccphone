const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

module.exports = new LocalStrategy({
	usernameField: 'email'
}, (email, password, done) => {
	User.findOne({email: email}, function (err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, {message: 'メールアドレスが登録されていません。'});
		}
		if (password !== user.password) {
			return done(null, false, {message: 'パスワードが正しくありません。'});
		}
		return done(null, user);
	});
});