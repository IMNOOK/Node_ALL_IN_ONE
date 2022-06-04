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


//게시판 글 올림
router.post('/', isLoggedIn, upload.single('img'), async (req, res, next) => {
	console.log('일단 여기까진 성공');
	console.log(req.file);
	try{
		await items.Post.set(req.user.id, req.body.content, req.body.url);
		return res.redirect('/');
	} catch(error){
		console.error(error);
		next(error);
	}
});

module.exports = router;