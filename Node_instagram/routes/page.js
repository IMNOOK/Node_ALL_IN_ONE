//다른 사람들이 만든 모듈
const express = require('express');

// 내가 만든 모듈 or 미리 설정한 값 가져옴
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const items = require('../models/items');

// routes 코드 시작 및 각종 설정
const router = express.Router();

//사용자에게 보여줄 자료들을 DB에서 끌어옴
//post처럼 모든 자료를 끌고 오는 것이 아니라 각각의 개인 유저의 필요한 정보만 가져옴

/**
 * @swagger
 *  /page:
 *    get:
 *      tags:
 *      - product
 *      description: 모든 제품 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: category
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 제품 조회 성공
 */

router.use((req, res, next) => {
	res.locals.user = req.user;
	
	next();
})

router.get('/', async (req, res) => {
	try{
		const twits = await items.Post.getAll();
		for(let i = 0; i < twits.length; i++) {
			//각 포스터의 좋아요 수
			const goodNum = await items.Good.getByPostId(twits[i].id);
			twits[i].goodNum = goodNum;
			
			//각 포스터의 댓글
			const comments = await items.Comment.getByPostId(twits[i].id);
			twits[i].comments = comments;
			
			// 현재 사용자가 좋아요를 했는지
			if(!req.user){
				continue;
			}
			const userGood = await items.Good.getByIds(req.user.id, twits[i].id);
			twits[i].userGood = userGood;	
		}
		return 	res.render('index', { title: 'Main', twits });
	} catch(err){
		console.error(err)
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