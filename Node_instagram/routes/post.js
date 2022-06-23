const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const { isLoggedIn } = require('./middlewares');
const items = require('../models/items');

/*

/post:

	post('/')
		글 쓰기 (userId, content, img)
		
	update('/:postId')
	    글 수정하기 (content, img, postId)
		
	delete('/:postId')
		내가 게시한글 삭제하기 (postId)

	get('/good/:postId')
		좋아요하기 (userId, postId)
		
	detele('/good/:postId)
	좋아요 취소하기 (userId, postId)
	
	get('/')
    	팔로우하기 (userId, follower)
	
	delete('/')
    	팔로우 취소하기 (userId, follower)    
	
*/

try{
	fs.readdirSync('uploads');
} catch(err) {
	console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
	fs.mkdirSync('uploads');
}

// img + 글 동시에 받기 위한 multer 사용
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
	return res.json({url: `/img/${req.file.filename}`});
});

router.post('/', isLoggedIn, upload2.none() ,async (req, res) => {
	let content = req.body.content;
	const url = req.body.url;
	if(items.Post.set(req.user.id, req.user.nick, content, url)){
		async Promise.all( content.match(/#[^\s#]+/g).map(tag => {
			console.log('hashtag 추가 '+tag.trim().substring(1));
			await items.Hashtag.set(tag.trim().substring(1));
		}))
		.then( => {
			  
			  })
		res.redirect('/');
	}	
	
})

/*#첫번째 #두번쨰#세번쨰 네번째*/

module.exports = router;