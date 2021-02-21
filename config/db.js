const mongoose = require('mongoose');

module.exports = () => {
	// DB
	const uri = 'mongodb://localhost/socket_room';
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