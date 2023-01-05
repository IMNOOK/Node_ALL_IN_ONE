//다른 사람들이 만든 모듈
const express = require('express');

// 내가 만든 모듈 or 미리 설정한 값 가져옴
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const items = require('../models/items');

// routes 코드 시작 및 각종 설정
const router = express.Router();

//유저계정 UI
router.use(async (req, res, next) => {
	res.locals.user = req.user;
	res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.followerId) : [];
	res.locals.goodPostIdList = req.user ? req.user.GoodPostIds.map(u => u.postId) : [];
	next();
});

//게시글 & 해시태그

router.get('/', async (req, res) => {
	const page = req.query.page;
	try{
		//게시글 가져오기
		let posts = await items.Post.getAll(page);
		for(let i = 0; i < posts.length; i++){
			//각 글마다 좋아요 갯수 세기
			posts[i].goodNum = await items.Good.getLengthByPostId(posts[i].id);
			
			//각 글마다 마지막 댓글 가져오기
			posts[i].comments = await items.Comment.getAllByPostId(posts[i].id);
		}
		console.log(posts);
		
		return 	res.render('index', { title: 'Main', twits: posts });	
		
	} catch (err) {
		console.error(err);
	}
});



router.get('/search/:title', async (req, res) => {
	const title = req.params.title;
	  
	try{
		let posts = await items.Post.getByHashtag(title);
		for(let i = 0; i < posts.length; i++){
			//각 글마다 좋아요 갯수 세기
			posts[i].goodNum = await items.Good.getLengthByPostId(posts[i].id);
			
			//각 글마다 마지막 댓글 가져오기
			posts[i].comments = await items.Comment.getAllByPostId(posts[i].id);
		}
		console.log(posts);
		return res.render('index', { title: 'Main', twits: posts});
	} catch (err) {
		console.error(err);
	}
});

//팔로우
router.get('/follow/:userId', isLoggedIn, async (req, res) => {
	try{
		const one = await items.Follow.getByIds(req.user.id, req.params.userId);
		if(!one){	
			const result = await items.Follow.set(req.user.id, req.params.userId);	
		}
	} catch (err) {
		console.error(err);
	}
	return res.redirect('/');
})

router.get('/follow/delete/:userId', isLoggedIn, async (req, res) => {
	const one = await items.Follow.getByIds(req.user.id, req.params.userId);
	if(one){	
		const result = await items.Follow.delete(req.user.id, req.params.userId);	
	}
	return res.redirect('/');
})

//페이지 이동
router.get('/follow/delete/:userId', isLoggedIn, async (req, res) => {
	await items.Follow.delete(req.user.id, req.params.userId);
	return res.redirect('/');
})

router.get('/profile', isLoggedIn, (req, res) => {
	return res.redirect(`/profile/${req.user.id}`);
});

router.get('/follow', isLoggedIn, async (req, res) => {
	const follows = await items.Follow.getFollowings(req.user.id);
	let posts = [];
	Promise.all( follows.map( async (follow) => {
		const post = await items.Post.getByUserId(follow.followerId);
		posts.push.apply(posts, post);
		})
	).then( async () => {
		
		for(let i = 0; i < posts.length; i++){
			//각 글마다 좋아요 갯수 세기
			posts[i].goodNum = await items.Good.getLengthByPostId(posts[i].id);
			
			//각 글마다 마지막 댓글 가져오기
			posts[i].comments = await items.Comment.getAllByPostId(posts[i].id);
		}
		
		posts.sort((a,b) => {
			return b.id - a.id;
		})
		return res.render('follow', { twits: posts });
	})
	.catch((err) => {
		console.error(err);
		return res.redirect('/');
	})
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

router.get('/dm', isLoggedIn, (req, res) => {
	return res.render('DM', { title: '내 정보 - NodeBird' });
});

module.exports = router;