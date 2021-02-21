const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
	email: String,
	password: String,
	roomId: String
});

module.exports = mongoose.model('User', User);