const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server, {path: '/socket.io'});
    app.set('io', io);

    const room = io.of('/room');
    const chat = io.of('/chat');

    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    })

    room.on('connection', (socket) => {
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        })
    });

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스에 접속');
        const req = socket.request;
        const { headers: { referer } } = req;
        const roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/, '');
        console.log('Room 에 입장 room id 는 ', roomId);
        socket.join(roomId);

        socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속 해제');
            socket.leave(roomId);
        });
    });
};