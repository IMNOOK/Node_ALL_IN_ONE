const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const { isLoggedIn } = require('./middlewares');
const items = require('../models/items');

try{
	fs.readdirSync('uploads');
} catch(error) {
	console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
	fs.mkdirSync('uploads');
}

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

//게시판 글 올림
router.post('/img', isLoggedIn, upload.single('photo'), async (req, res) => {
	console.log(req.file);
	return res.json({url: `/img/${req.file.filename}`});
});

router.post('/', isLoggedIn, upload2.none() ,async (req, res) => {
	const content = req.body.content;
	const url = req.body.url;
	console.log(content);
	console.log(url);
	if(items.Post.set(req.user.id, content, url)){
		res.redirect('/');
	}
})

module.exports = router;