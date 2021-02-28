const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);

const passport = require('passport');
const session = require('express-session')({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: false,
});
const flash = require('connect-flash');

const io = require('./config/socket.io')(httpServer);
const socketIoSession = require('./config/socket.io/socket.io-passport-session')(session, passport);

const logger = require('morgan');

const PORT = process.env.NODE_PORT || 3000;

// テンプレートエンジン
app.set('view engine', 'ejs');

// responseにx-powered-byヘッダーを出力しないようにする
app.set('x-powered-by', false);

// cors
const cors = require('cors')
app.use(cors())

// DB
require('./config/db')();

// 認証&セッション管理
require('./config/passport')();
app.use(session)
	.use(passport.initialize())
	.use(flash())
	.use(passport.session())
	.use(enableReferenceFromEjs);


// WebSocket
app.use(express.urlencoded({extended: false}))
io.use(socketIoSession.expressSession);
io.use(socketIoSession.passportInitialize)
io.use(socketIoSession.passportSession);

// ロギング
app.use(logger('dev'));

// ルーティング
app.use("/", require('./routes/router'));

// エラーハンドリング
app.use(require('./config/middlewares/errorHandler').createError)
	.use(require('./config/middlewares/errorHandler').errorHandler)

// WARNING !!! app.listen(PORT); will not work here, as it creates a new HTTP server
httpServer.listen(PORT);
console.log(`Server running at http://localhost:${PORT}`);

function enableReferenceFromEjs(req, res, next) {
	res.locals.user = req['user'];
	next();
}