const socketIo = require('socket.io');
let io;

module.exports = (httpServer) => {
	io = socketIo(httpServer, {
		cors: {
			origin: "https://example.com",
			methods: ["GET", "POST"]
		}
	});
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
				socket.broadcast.to(roomName).emit(type, message);
			} else {
				console.log('===== message broadcast all');
				socket.broadcast.emit(type, message);
			}
		}

		// When a user send a SDP message
		// broadcast to all users in the room
		socket.on('message', function (message) {
			var date = new Date();
			message.from = socket.id;
			console.log(date + 'id=' + socket.id + ' Received Message: ' + JSON.stringify(message));

			// get send target
			var target = message.sendto;
			if (target) {
				console.log('===== message emit to -->' + target);
				socket.to(target).emit('message', message);
				return;
			}

			// broadcast in room
			emitMessage('message', message);
		});

		// When the user hangs up
		// broadcast bye signal to all users in the room
		socket.on('disconnect', function () {
			// close user connection
			console.log((new Date()) + ' Peer disconnected. id=' + socket.id);

			// --- emit ----
			emitMessage('user disconnected', {id: socket.id});

			// --- leave room --
			var roomName = getRoomName();
			if (roomName) {
				socket.leave(roomName);
			}
		});

	})
	return io;
}
