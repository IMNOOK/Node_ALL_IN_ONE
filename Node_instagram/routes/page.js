//다른 사람들이 만든 모듈
const express = require('express');

// 내가 만든 모듈 or 미리 설정한 값 가져옴
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const items = require('../models/items');

// routes 코드 시작 및 각종 설정
const router = express.Router();

router.use(async (req, res, next) => {
	res.locals.user = req.user;
	res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
	res.locals.goodPostIdList = req.user ? req.user.GoodPostIds.map(u => u.postId) : [];
	next();
})

router.get('/', async (req, res) => {
	const page = req.query.page;
	try{
		let posts = await items.Post.getAll(page);
		for(let i = 0; i < posts.length; i++){
			//각 글마다 좋아요 갯수 세기
			posts[i].goodNum = await items.Good.getByPostId(posts[i].id);
			
			//각 글마다 마지막 댓글 가져오기
			posts[i].comments = await items.Comment.getByPostId(posts[i].id);
		}
		console.log(posts);
		return 	res.render('index', { title: 'Main', twits: posts });
	} catch (err) {
		console.error(err);
	}
});

router.get('/search/:title', async (req, res) => {
	const page = req.query.page;
	const title = req.params.title;
	  
	try{
		let posts = await items.Post.getByHashtag(page, title);
		for(let i = 0; i < posts.length; i++){
			//각 글마다 좋아요 갯수 세기
			posts[i].goodNum = await items.Good.getByPostId(posts[i].id);
			
			//각 글마다 마지막 댓글 가져오기
			posts[i].comments = await items.Comment.getByPostId(posts[i].id);
		}
		console.log(posts);
		return res.render('index', { title: 'Main', twits: posts});
	} catch (err) {
		console.error(err);
	}
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