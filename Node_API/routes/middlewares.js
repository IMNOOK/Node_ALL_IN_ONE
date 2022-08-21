const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

exports.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		next();
	} else{
		res.status(403).send('로그인 필요함');
	}
}

exports.isNotLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()){
		next();
	} else {
		const message = encodeURIComponent('로그인한 상태입니다.');
		res.redirect(`/?error={message}`);
	}
}

exports.verifyToken = (req, res, next) => {
	try{
		req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
		return next();
	} catch(err) {
		if (err.name === 'TokenExpiredError') {
			return res.statue(419).json({
				code: 419,
				message: '토큰이 만료되었습니다'
			});
		}
		return res.status(401).json({
			code: 401,
			message: '유효하지 않는 토큰입니다',
		});
	}
}

exports.apiLimiter = rateLimit({
	
})

exports.deprecated = (req, res) => {
	res.status(410).json({
		code: 410,
		message: '새로운 버전이 나왔습니다. 새로운 버전 사용하세요.'
	})
}