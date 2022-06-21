const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const items = require('../models/items');

const router = express.Router();


router.get('/main', (req, res) => {
	const req.
	try{
		
	} catch (err) {
		console.error(err);
	}
});



/*
page.js
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