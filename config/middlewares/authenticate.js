// 認証フィルター
module.exports = function (req, res, next) {
	if (req.isAuthenticated()) {  // 認証済
		return next();
	} else {  // 認証されていない
		res.redirect('/account/login');
	}
}