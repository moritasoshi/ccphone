const socketIo = require('socket.io');
let io;

module.exports = (httpServer) => {
	io = socketIo(httpServer);
	io.on('connection', async (socket) => { // websocket接続
		const loginUser = await getLoginUser();

		if (loginUser) {
			const roomName = loginUser.roomId;
			joinTo(roomName);
			console.log(`${loginUser.email} joined to ${roomName}`)
			setRoomName(roomName);
		} else {
			redirectTo('/account/login');
		}

		socket.on('chat message', (msg) => { // 'chat message'のイベント受信時に発火
			console.log('message: ' + msg);
			emitMessage('chat message', msg)
		});

		function setRoomName(room) {
			socket.roomName = room;
		}

		function getRoomName() {
			const room = socket.roomName;
			return room;
		}

		function joinTo(room) {
			socket.join(room)
		}

		function redirectTo(path) {
			socket.emit('redirect', path)
		}

		function getLoginUser() {
			return socket.request.user || null;
		}

		function emitMessage(type, message) {
			// ----- multi room ----
			const roomName = getRoomName();

			if (roomName) {
				console.log('===== message broadcast to room -->' + roomName);
				io.to(roomName).emit(type, message);
			} else {
				console.log('===== message broadcast all');
				io.emit(type, message);
			}
		}
	})
	return io;
}
