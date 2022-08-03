/*
/room:

	get('/')
    	Room 열기 = 목록 가져오기 (userId)
	
	post('/')
    	Room 추가 하기(aId, bId)
		
	get('/:roomId')
	    DM 읽기(roomId, page)
		
	post('/:roomId')
    	DM 보내기 (roomId, content, sender)
*/

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { items } = require('../models/items');

const router = express.Router();

router.post('/room', async (req, res, next) => {
	try{
		const newRoom = await items.Room.set(req,user.id, userId);
		const io = req.app.get('io');
		io.of('/room').emit('newRoom', newRoom);
		res.redirect(`/room/${newRoom._id}`);	
	} catch(error) {
		console.error(error);
		next(error);
	}
});

router.get('/room/:id', async (req, res, next) => {
	try{
		const room = await items.Room.get(req.params.id);
		const io = req.app.get('io');
		if( !room ) {
			return res.redirect('/?error=존재하지 않는 방입니다.');
		}
		const { rooms } = io.of('/chat').adapter;
		const DMS = await DM.getByRoomId(room.id);
		return res.render('DM', {
			room, DMs, 
		});	
	} catch(error) {
		console.error(error);
		next(error);
	}
});

router.post('/room/:id/chat', async (req, res, next) => {
	try{
		const chat = await items.DM.set(req.params.id, req.user.id, req.body.chat);
		req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
		res.send('ok');	
	} catch(error) {
		console.error(error);
		next(error);
	}
});

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, done) {
			done(null, 'upload/');
		},
		filename(req, file, done) {
			const ext = path.extname(file.originalname);
			done(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/room/:id/gif', upload.single('gif'), async (req, res, next) => {
	try{
		const chat = await Chat.set(req.params.id, req.user.id, req.file.filename);
		req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
		res.send('ok');
	} catch(error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;