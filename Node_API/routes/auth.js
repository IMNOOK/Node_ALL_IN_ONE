//다른 사람들이 만든 모듈
const express = require('express');
const passport = require('passport');


// 내가 만든 모듈 or 미리 설정한 값 가져옴 
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


// routes 코드 시작 및 각종 설정
const router = express.Router();

router.post('/login', isNotLoggedIn, async (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			console.error(authError);
			return next(authError);
		}
		
		if (!user) {
			return res.redirect('/');
		}
		return req.login(user, (loginError) => {
			if(loginError) {
				console.error(loginError);
				return next(loginError);
			}
			return res.redirect('/');
		})
	})(req, res, next);
});

router.get('/logout',isLoggedIn, (req, res, next) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;