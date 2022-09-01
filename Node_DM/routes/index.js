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
		if(!data.id){
			console.log('id == undefined');
			return await axios.get(`${URL}${api}`, {
				headers: { authorization: req.session.jwt },
			});
		}
		if(data.id == 1){
			console.log(data.email, data.password);
			return await axios.get(`${URL}${api}`, {
				data: {
					email: data.email,
					password: data.password,	
				},
				headers: { authorization: req.session.jwt },
			});
		}
		return await axios.get(`${URL}${api}`, {
			data: {
				userId: data.userId	
			},
			headers: { authorization: req.session.jwt },
		});
	} catch(err) {
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
		const data = {id: 2, userId: req.user.id};
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
		let data = {id: 1, email, password};
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
		
		const test = await Room.create({
			aId: 0,
			bId: 999,
			title: 'sex',
		});
		
		console.log(test);
		
		const testResult = await Room.find({
			aId: 0,
		});
		console.log(testResult);
		
		let aId = []; //상대가 더 빨리 만든 아이디
		let bId = []; //상대가 더 늦게 만든 아이디
		result1.data.payload.forEach((obj) => {
			if(obj.followerId > userId) {
				bId.push(obj.followerId);	
			} else{
				aId.push(obj.followerId);
			}
		});
		console.log(aId);
		console.log(bId);
		
		let Room = [];
		const aIdRooms = await Room.find({ //상대가 더 빨리 만든 아이디의 방
			bId: userId
		});
		
		const bIdRooms = await Room.find({ //상대가 더 늦게 만든 아이디의 방
			aId: userId
		});
		
		Room.push.apply(aIdRooms);
		Room.push.apply(bIdRooms);
		
		Promise.all( aId.map(async (id) => {
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
				Room.push(newRoom);
			}
		}))
		
		Promise.all( bId.map(async (id) => {
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
				Room.push(newRoom);
			}
		}))
		
		console.log(Room);
		return res.render('main', { user: result.data.user, rooms: Room });
	} catch(err) {
		console.error(err);
		next(err);
	}
})
module.exports = router;