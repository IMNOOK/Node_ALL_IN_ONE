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

router.post('/img', isLoggedIn, upload.single('photo'), async (req, res) => {
	return res.json({url: `/img/${req.file.filename}`});
})

//유저 프로필 페이지 이동 
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

//유저 프로파일 수정
router.post('/:userId', isLoggedIn, upload2.none(), async (req, res, next) => {
	const userId = req.params.userId;
	const nick = req.body.nick;
	const url = req.body.url;
	if(nick == ''){
		const error = new Error(`닉네임을 입력하세요.`);
		next(error);
	} 
	if (await items.User.update(nick, url, userId)){
		return res.redirect('/');
	}
	const error = new Error(`이미 존재하는 닉네임입니다.`);
	next(error);
});

module.exports = router;