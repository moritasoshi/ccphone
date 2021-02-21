module.exports = (session, passport) => {
	return {
		expressSession:
			(socket, next) => {
				session(socket.request, {}, next)
			},
		passportInitialize:
			(socket, next) => {
				passport.initialize()(socket.request, {}, next)
			},
		passportSession:
			(socket, next) => {
				passport.session()(socket.request, {}, next)
			}
	}
}