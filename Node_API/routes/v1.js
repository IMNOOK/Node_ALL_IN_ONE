const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middlewares');
const items = require('../models/items');

const router = express.Router();

router.post('/token', async (req, res) => {
	const { clientSecret } = req.body;
	try{
		const domain = await items.Domain.getByClientSecret(clientSecret);
		if(!domain) {
			return res.status(401).json({
				code: 401,
				message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요'
			});
		}
		const token = jwt.sign({
			id: domain.userId,
			nick: domain.userNick,
		}, process.env.JWT_SECRET, {
			expiresIn: '1m'
		});
		return res.json({
			code: 200,
			message: '토큰이 발급되었습니다',
			token,
		});
	} catch(err) {
		console.error(err);
		return res.status(500).json({
			code: 500,
			message: '서버 에러',
		});
	}
});

router.get('/test', verifyToken, (req, res) => {
	res.json(req.decoded);
});

router.get('/follow', verifyToken, async (req, res) => {
	try{
		const users = await items.Follow.getFollowings(req.decoded.id);
		console.log(users);
		res.json({
			code: 200,
			payload: users,
		})
	} catch(err) {
		console.error(err);
		return res.status(500).json({
			code: 500,
			message: '서버 에러',
		});
	};
})

module.exports = router;