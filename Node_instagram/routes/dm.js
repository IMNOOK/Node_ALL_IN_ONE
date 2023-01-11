const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const items = require('../models/items');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    const followers = req.user.Followings;
    console.log(followers);
    //사용자의 room id 가져 옴
    const r = await items.Room.getByUserId(req.user.id);
    let rooms = [];
    //사용자의 room id 가져 옴
    await Promise.all(r.map( async (room) => {
        let id;
        let ob;
        if(room.aId == req.user.id){
            id = room.bId;
        } else {
            id = room.aId;
        }
        ob = await items.User.getOne(id);
        ob.roomid = room.id;
        rooms.push(ob);
    })
    )


    rooms.sort((a, b) => {return a.roomid - b.roomid});

	return res.render('DM', { title: '내 정보 - NodeBird', followers, rooms, room: {id:0} });
});

router.get('/:id', isLoggedIn, async(req, res) => {
    const otherId = req.params.id;
    await items.Room.set(req.user.id, otherId);

    const followers = req.user.Followings;
    console.log(followers);
    //Room들을 가져와야 함.

    const r = await items.Room.getByUserId(req.user.id);
    let rooms = [];
    //사용자의 room id 가져 옴
    await Promise.all(r.map( async (room) => {
        let id;
        let ob;
        if(room.aId == req.user.id){
            id = room.bId;
        } else {
            id = room.aId;
        }
        ob = await items.User.getOne(id);
        ob.roomid = room.id;
        rooms.push(ob);
    })
    )



   

    rooms.sort((a, b) => {return a.roomid - b.roomid});

	return res.render('DM', { title: '내 정보 - NodeBird', followers, rooms, room: {id:0} });
})

//채팅 저장
router.post('/:roomid/chat', isLoggedIn, async(req, res, next) => {
    const result = await items.DM.setChat(req.params.roomid, req.user.id, req.body.chat);
    console.log("chat is save in DB", result);
    const data = { chat: req.body.chat, user: req.user };
    req.app.get('io').of('/chat').to(req.params.roomid).emit('chat', data);
    res.send('ok');
})

// img + 글 동시에 받기 위한 multer 사용
const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'uploads/');
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  });

router.post('/:roomid/gif', upload.single('gif'), async (req, res, next) => {
    try {
        console.log(req.file.filename);
        const chat = await items.DM.setGif(req.params.roomid, req.user.id, req.file.filename);
        const data = { gif: 1, chat: req.file.filename, user: req.user };
        req.app.get('io').of('/chat').to(req.params.roomid).emit('chat', data);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:userid/:roomid', isLoggedIn, async (req, res) => {
    try{
        const roomid = req.params.roomid;
        const otherId = req.params.userid;
        const other = await items.User.getOne(otherId);

        //Room들을 가져와야 함.
        const r = await items.Room.getByUserId(req.user.id);
        let rooms = [];
        //사용자의 room id 가져 옴
        await Promise.all(r.map( async (room) => {
            let id;
            let ob;
            if(room.aId == req.user.id){
                id = room.bId;
            } else {
                id = room.aId;
            }
            console.log("room id is ", room.id);
            ob = await items.User.getOne(id);
            ob.roomid = room.id;
            rooms.push(ob);
        })
        )


        

        rooms.sort((a, b) => {return a.roomid - b.roomid});
        //room i를 어떻게 해서든 socket.join(roomId);시켜야 함.
        req.app.get('io').emit('room');
        
        //DB에서 여태까지 했던 chatting 가져옴
        const chats = await items.DM.getChat(roomid);
        return res.render('DM', { chats, rooms, room: {id: roomid}, user: req.user, other });

    } catch (err) {
        console.error(err);
    }
});

module.exports = router;