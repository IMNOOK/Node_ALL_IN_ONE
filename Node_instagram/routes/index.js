//다른 사람들이 만든 모듈
const express = require('express');

// routes 코드 시작 및 각종 설정
const router = express.Router();


router.get('/', (req, res) => {
	return res.render('index.html', { title: '내 정보 - NodeBird' });
});

router.get('/login', (req, res) => {
	return res.render('login', {title: '회원가입 - NodeBird' });
});


module.exports = router;