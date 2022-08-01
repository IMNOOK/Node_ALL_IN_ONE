const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

module.exports = (server, app, sessionMiddleware) => {
	const io = SocketIO(server, { path: '/socket.io' }); //SocketIO를 서버와 합쳤으며 인수로 클라이언트가 접속할 경로인 path만 사용했음

	io.on('connection', (scoket) => {
		//listening 상태로 두고, path를 입력한 요청 connection이 일어날 때 이벤트를 실행
		//콜백으로 socket 객체를 제공한다.
		const req = cookie.request;
		/*
		io에 server를 연동시켰기에
		socket.request 속성으로 req객체에 접근 가능
		socket.request.res롤 응답 객체에 접근 가능
		socket.id로 소켓 고유 아이디를 가져올 수 있음, 아이디로 소켓 소유자 특정 가능
		socket.on('이벤트', (인수) => {})로 이벤트 리스너를 불텨 disconnect, error, reply 등 사용 가능
		socket.emit('이벤트', '데이터')를 통해 소켓 전송가능, 받는 방법은 socket.on('이벤트이름(동일해야함)', (data) => {콜백})
		*/
		app.set('io', io); //app의 라우터에서 io 객체를 사용할 수 있도록 저장해 둠. req.app.get('io')로 접근 가능
		
		const room = io.of('/room'); // Socket.IO에 네임스페이스를 부여하는 메서드 of /room: 채팅방 생성 및 삭제에 관한 정보 담김
		const chat = io.of('/chat'); //기본적으로는 / 네임스페이스에 접속하지만 of 메서드를 이용하여 다른 네임스페이스를 만들어 접속할 수 있다.
		//같은 네임스페이스끼리만 데이터를 전송한다.
		
		io.use((socket, next) => {
			cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next); //io객체에 cookie-parser을 연결로 쿠키생성 가능
			sessionMiddleware(socket.request, socket.request.res, next); //socket과 express-session을 실행하여 socket.request.session으로 세션 ssion을 실행시킴
			//socket.request.session 객체가 생성됨. socket.request.signedCookies[sid]를 통해 사용자 식별
		})
		//모든 소켓 연결시 마다 실행: 세션 미들웨어에 요청 객체(socket.request), 응답 객체(socket.request.res), next 함수를 인수로 넣으면 socket.request 객체 안에 socket.request.session 객체 생성됨
		
		room.on('connection', (socket) => {
			console.log('room 네임스페이스에 접속');
			socket.on('disconnect', () => {
				console.log('room 네임스페이스 접속 해제');
			});
		});
		
		chat.on('connection', (socket) => {
			console.log('chat 네임스페이스에 접속');
			const req = socket.request;
			const { headers: {referer} } = req;
			const roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/,''); // socket.request.headers.referer를 통해 현재 웹 페이지의 url을 가져와 url 내부의 방 아이디 부분을 추출
			socket.join(roomId); //방에 들어가는 메서드
			socket.to(roomId).emit('join', {
				user: 'system',
				chat: `${req.session.user}님이 입장하셨습니다.`,
			})
			
			socket.on('disconnect', () => {
				console.log('chat 네임스페이스 접속 해제');
				socket.leave(roomId)// 방에 나가는 메서드
				//접속해제 시에는 현재 방의 사람 수를 구해서 0이면 제거 아니면 퇴장했다는 데이터 보낸다.
				const currentRoom = socket.adapter.rooms[roomId]; // 참여 중인 소켓 정보가 들어있다.
				const userCount = currentRoom ? currentRoom.length : 0;
				if (userCount === 0) {
					/*
					axios에 요청을 보낼 때 요청자가 누구인지 정보가 들어 있지 않다.
					express-session에서 세션 쿠키인 req.signedCookies['connect.sid']를 보고 현제 세션이 누구인지 판단한다.
					브라우저에서 axios 요청을 보낼 떄는 자동으로 쿠키를 넣어 보재니만, 서버에서 axios 요청을 할 때는 쿠키가 같이 보내지지 않는다
					따라서 express-session이 판단할 수 있게 하려면 직접 헤더에 세션 쿠키를 넣어야 한다.
					req.signedCookies 내부의 쿠키들은 모두 복호화되어 있으므로 다시 암호화 해서 요청에 담아야 한다.
					이때 express-session의 세션 쿠키 앞에는 s%3A를 붙여야 한다.
					*/
					const signedCookies = req.signedCookies['connect.sid']; //connect.sid는 내 sid를 불러온다, 즉 내 세션에 저장된 데이터의 키값을 불러온다.  lm41sgKRSNXqSDbwmmmDhyiJenGzaiMT
					const connectSID = cookie.sign(signedCookies, process.env.COOKIE_SECRET); // 내 세션에 저장된 값에 서명된 쿠키값을 붙인다. lm41sgKRSNXqSDbwmmmDhyiJenGzaiMT.vmEkXSVKF0myTOnQNV0BKrNa+Nftn2sJ7gO0KngoXuY
					axios.delete(`url/room/${roomId}`, {
						headers: {
							Cookie: `connect.sid=s%3A${connectSID}`, //단 이때 session에서 쿠키를 암호화하면 앞에 s:를 붙이는데, 이를 따라하기 위해 s%4A$를 붙여준다. s%4A$lm41sgKRSNXqSDbwmmmDhyiJenGzaiMT.vmEkXSVKF0myTOnQNV0BKrNa+Nftn2sJ7gO0KngoXuY -> 세션에서 세션쿠키를 읽어 세션을 사용할 수 있다. 즉, DELETE /room/:id 라우터에서 방 삭제 요청을 누가했는지 알 수 있다.
						},
					})
					.then(() => {
						console.log('방 제거 요청 성공');
					})
					
					.catch((error) => {
						console.error(error);
					})
				} else {
					socket.to(roomId).emit('exit', {
						user: 'system',
						chat: `${req.session.color} 님이 퇴장하셨습니다.`,
					});
				}
			})

		})
		
	})
}

/*
WebSocket version
//socket.js
const WebSocket = require('ws');

module.exports = (server) => {
	const wss = new WebSocket.Server({server});
	
	wss.on('connection', (ws, req) => {
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log('새로운 클라이언트 접속', ip);
		ws.on('message', (message) => {
			console.log(message);
		});
		ws.on('error', (error) => {
			console.log(error);
		});
		ws.on('close', ()=> {
			console.log('클라이언트 접속 해제', ip);
			clearInterval(ws.interval);
		});
		
		ws.interval = setInterval(() => {
			if (ws.readyState === ws.OPEN) {
				ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
			}
		}, 3000);
	})
}

//html
<script>
	const webSocket = new WebSocket("ws://url"); // 도메인 빼고
	webSocket.onopen = function() {
		console.log('서버와 웹 소켓 연결 선공!');
	};
	
	webSocket.onmessage = function(event) {
		console.log(event.data);
		webSocket.send('클라이언트에서 서버로 답장을 보냅니다.');
	}
</script>
*/