const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
	},
	password: String,
	roomId: {
		type: String,
		unique: true,
	}
});

module.exports = mongoose.model('User', User);