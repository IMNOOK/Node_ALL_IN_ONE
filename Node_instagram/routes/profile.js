const express = require('express');
const multer = require('multer');
const path = require('path');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const items  = require('../models/items');

const router = express.Router();

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, 'uploads/');	
		},
		filename(req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024}
});

const upload2 = multer({});

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

router.post('/img', isLoggedIn, upload.single('photo'), async (req, res) => {
	return res.json({url: `/img/${req.file.filename}`});
})

router.get('/:userId', isLoggedIn, async (req, res) => {
	try{
		const userId = req.params.userId;
		let user = await items.User.getOne(userId);
		user.follower = await items.Follow.getFollowings(userId);
		user.follow = await items.Follow.getFollowers(userId);
		console.log(user);
		const twits = await items.Post.getByUserId(userId);
		return res.render('profile', { twits, user, id: req.user.id });	
	} catch (err) {
		console.error(err);
	}
});

router.post('/:userId', isLoggedIn, upload2.none(), async (req, res) => {
	const userId = req.params.userId;
	const nick = req.body.nick;
	const url = req.body.url;
	if(await items.User.update(nick, url, userId)){
		return res.redirect('/');
	}
	return res.redirect('?error');
});

module.exports = router;