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
	const postResult = await items.Post.set(req.user.id, req.user.nick, url);
	const commentResult = await items.Comment.set(content, postResult, req.user.id, req.user.nick);
	
	if(postResult){
		Promise.all(
			content.match(/#[^\s#]+/g).map(async (tag) => {
				const title = tag.trim().substring(1);
				console.log('hashtag 추가 '+title);
				let hashtagResult = await items.Hashtag.get(title);
				console.log(hashtagResult);
				if(hashtagResult){
					hashtagResult = hashtagResult.id;
				} else {
					hashtagResult = await items.Hashtag.set(title);
				}
				await items.PostHashtag.set(postResult, hashtagResult);
			})
		);
	}
	res.redirect('/');
})

router.post('/:postId', isLoggedIn, async (req, res) => {
	const comment = req.body.comment;
	const postId = req.params.postId;
	const result = await items.Comment.set(comment, postId, req.user.id, req.user.nick);
	console.log(result);
	return res.redirect('/');
})

router.delete('/:postId', isLoggedIn, async (req, res) => {
	const postId = req.params.postId;
	await items.Post.delete(postId);
	return res.redirect('/');
})

module.exports = router;