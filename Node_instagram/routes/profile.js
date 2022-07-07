const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const items  = require('../models/items');

const router = express.Router();

/*
/profile:
		
	get('/:userid')
		유저 프로파일 페이지 이동
		유저 정보 보기(userId)
		팔로잉, 팔로워 숫자 보기:
			팔로잉 숫자 보기 (userId)
			팔로워 숫자 보기 (userId)

		유저가 게시한글 보기 (userId)

	update('/:userId')
		프로필 정보 수정 (nick, email, img, userId)
*/

router.get('/:userId', isLoggedIn, async (req, res) => {
	try{
		const userId = req.params.userId;
		let user = await items.User.getOne(userId);
		user.follower = await items.Follow.getFollowings(userId);
		user.follow = await items.Follow.getFollowers(userId);
		const twits = await items.Post.getByUserId(userId);
		return res.render('profile', { twits, user });	
	} catch (err) {
		console.error(err);
	}
});

router.get('/:userId', isLoggedIn, async (req, res) => {
	
});

module.exports = router;