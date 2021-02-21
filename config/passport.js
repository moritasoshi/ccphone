const passport = require('passport');
const local = require('./passport/local');

module.exports = () => {
	// serialize sessions
	passport.serializeUser((user, done) => {
		console.log('Serialize ...');
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		console.log('Deserialize ...');
		done(null, user);
	});

	// use these strategies
	passport.use(local);
}