const mongoose = require('mongoose');
const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'socket_room'
const MONGO_PORT = process.env.MONGO_PORT || '27017'

module.exports = () => {
	// DB
	const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
	mongoose
		.set('useCreateIndex', true)
		.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		.then(() => console.log(`Database Connected to ${uri}`))
		.catch(err => console.log(err));
}