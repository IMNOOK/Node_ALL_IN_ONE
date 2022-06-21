//다른 사람들이 만든 모듈
const express = require('express');

// 내가 만든 모듈 or 미리 설정한 값 가져옴
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const items = require('../models/items');

// routes 코드 시작 및 각종 설정
const router = express.Router();

router.get('/', async (req, res) => {
	const page = req.query.page;
	try{
		const posts = items.Post.getAll(page);
		
	} catch (err) {
		
	}
	
	return 	res.render('index', { title: 'Main' });

});

router.get('/profile', isLoggedIn, (req, res) => {
	return res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/follow', isLoggedIn, (req, res) => {
	return res.render('follow', { title: '내 정보 - NodeBird' });
});

router.get('/post', isLoggedIn, (req, res) => {
	return res.render('post', { title: '내 정보 - NodeBird' });
});

router.get('/login', isNotLoggedIn, (req, res) => {
	return res.render('login', { title: '내 정보 - NodeBird' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
	return res.render('join', { title: '내 정보 - NodeBird' });
});

module.exports = router;