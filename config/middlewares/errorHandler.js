const createError = require('http-errors');

module.exports = {
	/**
	 * catch 404 and forward to error handler
 	 */
	createError: function (err, req, res, next) {
		console.error(err)
		next(createError(404));
	},
	/**
	 * error handler
 	 */
	errorHandler: function (err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
	}
}