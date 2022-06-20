const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const items = require('../models/items');

const router = express.Router();

router.ues((req, res, next) => {
	res.locals.user = req.user;
	next();
});

router.get('/main', async(req, res) => {
	const page = req.query.page;
	const search = req.query.search;
	
	try{
		
		if(search == undefined){
			const twits = await items.Post.getAll(page);
			
		} else {
			const twits = await items.Post.getHashtag(search, page);
		}
		
		for(let i = 0; i < twits.length; i++){
			const goodNum = await items.Good.getByPostId(twits[i].id);
			twits[i].goodNum = goodNum;
			
			const comments = await items.Comment.getByPostId(twits[i].id);
			twits[i].comments = comments;
			
			if(!req.user) {
				continue;
			}
			const userGood = await items.Good.getByPostId(req.user.id, twits[i].id);
			twis[i].userGood = userGood;
		}
		
		return res.render('index', { title: 'Main', twits });
	} catch(err) {
		console.error(err);
	}
});

router.post('/comment/:postId', isLoggedIn, async (req, res) => {
	const { contents } = req.body;
	const postId = req.query.postId;
	
	try{
		
	} catch(err) {
		console.error(err);
	}
})

/*
/:

	get('/main?page=params1'):    
		글 가져 오기 (page),
		각 글마다 좋아요 가져오기 (postId),
		각 글마다 댓글 가져오기 (postId)
	
	get('/main?search=params1&page=params2') 
		hashtag 검색한 글 가져오기 (title, page)
		
	
    post('/comment/:postId')
		댓글 달기 (content, postId, usernick)
    
	get('/login')
		로그인 페이지 이동

	get('/join')
		회원가입 페이지 이동
	
	get('/post')
		포스트 페이지 이동
		
*/