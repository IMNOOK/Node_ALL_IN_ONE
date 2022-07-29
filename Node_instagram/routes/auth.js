const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

// 내가 만든 모듈 or 미리 설정한 값 가져옴 
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const items = require('../models/items');

// routes 코드 시작 및 각종 설정
const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res) => {
	const { email, nick, password } = req.body;
	console.log(nick);
	try{
		const hash = await bcrypt.hash(password, 12);
		const img = `/img/${nick}.png`;
		if(items.User.set(email, nick, hash, img) === 0) {
			return res.redirect('/join?error=exist');
		}
		return res.redirect('/');	
	} catch (err) {
		console.error(err);
	}
})

router.post('/login', isNotLoggedIn, async (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => { //local 스토리지 함수 실행 후 return 되는 값들을 뒤에서 사용
		if(authError) {
			console.error(authError);
			return next(authError);
		}
		if(!user){
			return res.redirect('/');
		}
		return req.login(user, (loginError) => { //serializeUser 실행하고 
			if(loginError) {
				console.error(loginError);
				return next(loginError);
			}
			return res.redirect('/');
		}) //req.user 세션을 추가
	})(req, res, next);
})

router.get('/logout',isLoggedIn, (req, res, next) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;