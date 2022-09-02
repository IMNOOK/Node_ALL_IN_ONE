const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'https://node-all-in-one-api.run.goorm.io/v1';
axios.defaults.headers.origin = 'https://node-all-in-one-dm.run.goorm.io';

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

router.get('/', (req, res) => {
	return res.render('main');
})

router.get('/login', (req, res) => {
	return res.render('login');
})

const request = async (req, api, data) => {
	try{
		if (!req.session.jwt) {
			const tokenResult = await axios.post(`${URL}/token`, {
				clientSecret: process.env.CLIENT_SECRET,
			});
			req.session.jwt = tokenResult.data.token;
		}
		return await axios.get(`${URL}${api}`, {
			data,
			headers: { authorization: req.session.jwt },
		});
	} catch(err) {
		console.log(err.response);
		if( err.response.status === 419) {
			delete req.session.jwt;
			return request(req, api);
		}
		return err.response;
	}
}

router.get('/test', async (req, res) => {
	try{
		const result = await request(req, '/test');
		return res.json(result.data);	
	} catch(err) {
		console.error(err);
		next(err);
	}
});

router.get('/follow', async (req, res) => {
	try{
		if(!req.session.is_logined){
			return res.redirect('/');
		}
		const data = {userId: req.user.id};
		const result = await request(req, '/follow', data);
		console.log(result.data);
		return res.json(result.data);
	} catch (err){
		console.error(err);
		next(err);
	}
});

router.post('/login', async (req, res) => {
	try{
		// 로그인 
		const { email, password } = req.body;
		let data = {email, password};
		const result = await request(req, '/login', data);
		if(!result.data.user){
			return res.redirect('/');
		}
		req.session.user = result.data.user;
		req.session.is_logined = true;
		const userId = result.data.user.id;
		data = {id: 2, userId};
		const result1 = await request(req, '/follow', data);
		console.log(result1.data);
		
		//로그인 완료 이후 Room 가져오기
		
		let aId = []; //상대가 더 빨리 만든 아이디
		let bId = []; //상대가 더 늦게 만든 아이디
		result1.data.payload.forEach((obj) => {
			if(obj.followerId > userId) {
				bId.push(obj.followerId);	
			} else{
				aId.push(obj.followerId);
			}
		});
		
		let Rooms = [];
		const aIdRooms = await Room.find({ //상대가 더 빨리 만든 아이디의 방
			bId: userId
		});
		
		const bIdRooms = await Room.find({ //상대가 더 늦게 만든 아이디의 방
			aId: userId
		});
		
		//상대가 더 빨리 만든 아이디인데, 방이 없어서 생성
		await Promise.all( aId.map(async (id) => {
			let aIdCheck = (room) => {
				if(room.aId === id){
					return true;
				}
			}
			
			if(!aIdRooms.some(aIdCheck)){
				console.log(id, '번 방이 없습니다.');
				let newRoom = await Room.create({
					aId: id,
					bId: userId,
					title: 'DM을 시작해보세요!',
				});
				console.log(newRoom, '방을 생성했습니다.');
				aIdRooms.push(newRoom);
			}
		}))
		
		//상대가 더 늦게 만든 아이디인데, 방이 없어서 생성
		await Promise.all( bId.map(async (id) => {
			let bIdCheck = (room) => {
				if(room.bId === id){
					return true;
				}
			}
			
			if(!bIdRooms.some(bIdCheck)){
				console.log(id, '번 방이 없습니다.');
				let newRoom = await Room.create({
					aId: userId,
					bId: id,
					title: 'DM을 시작해보세요!',
				});
				console.log(newRoom, '방을 생성했습니다.');
				bIdRooms.push(newRoom);
			}
		}))
		
		let params;
		let userData;
		let tmp;
		await Promise.all(aIdRooms.map( async (v, i) => {
			params = {userId: v.aId};
			userData = await request(req, `/user/${v.aId}`, params);
			tmp = aIdRooms[i];
			tmp.user = userData.data.payload;
			console.log(tmp);
			Rooms.push(tmp);
			
		}));
		
		await Promise.all(bIdRooms.map( async (v, i) => {
			params = {userId: v.bId};
			userData = await request(req, `/user/${v.bId}`, params);
			bIdRooms[i].user = userData.data.payload;
			Rooms.push(bIdRooms[i]);
		}));
		
		console.log('방완성');
		console.log(Rooms);
		return res.render('main', { user: result.data.user, rooms: Rooms });
	} catch(err) {
		console.error(err);
		next(err);
	}
})
module.exports = router;