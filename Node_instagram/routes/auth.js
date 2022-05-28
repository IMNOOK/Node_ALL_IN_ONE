const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

// 내가 만든 모듈 or 미리 설정한 값 가져옴 
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { items } = require('../models/items');

// routes 코드 시작 및 각종 설정
const router = express.Router();

router.post('/join',isNotLoggedIn, async (req, res, next) => {
	const { email, nick, password } = req.body;
	try{
		const hash = await bcrypt.hash(password, 12);
		if(items.User.set(email, nick, hash) === 1){
			return res.redirect('/join?error=exist');
		}
	} catch(error){
		console.error(error);
	}
	return res.redirect('/');
});

router.post('/login', isNotLoggedIn, async (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			console.error(authError);
			return next(authError);
		}
		if (!user) {
			return res.redirect('/')
		}
		return req.login(user, (loginError) => {
			if(loginError) {
				console.error(loginError);
				return next(loginError);
			}
			return res.redirect('/');
		});
	})(req, res, next); //미들웨어 내의 미들웨어는 (req, res, next)를 붙여서 인수를 줘야 한다!!
});

router.get('/logout',isLoggedIn, (req, res, next) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;