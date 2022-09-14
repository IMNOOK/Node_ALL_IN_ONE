const express = require('express');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');
var mongoose = require('mongoose');

const router = express.Router();

router.get('/:roomId', async (req, res, next) => {
	try{
		const roomId = req.params.roomId;
		console.log(roomId);
		const id = mongoose.Types.ObjectId(roomId);
		console.log(id);	
		const chats = await Chat.find({
			room: id
		}).sort('createdAt');
		return res.render('chat', { userId: req.session.user.id, chats, roomId });	
	} catch(err) {
		console.error(err);
		next(err);
	}
});

router.post('/:roomId/chat', async (req, res) => {
	try{
		const roomId = req.params.roomId;
		console.log(roomId);
		const id = mongoose.Types.ObjectId(roomId);
		const chat = await Chat.create({
			room: id,
			userId: req.session.user.id,
			userNick: req.session.user.nick,
			userImg: req.session.user.img,
			chat: req.body.chat,
		});
		console.log(chat);
		req.app.get('io').of('/chat').to(req.params.roomId).emit('chat', chat);
		res.send('ok');
	} catch(err){
		console.error(err);
		next(err);
	}
})

/*

data.user = {id, nick, img}
data.chat or data.gif
*/
module.exports = router;