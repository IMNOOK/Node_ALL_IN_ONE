1. 설계
Node스타그램

주요 기능: 로그인, Post 작성, 해시태그 검색, DM, 댓글 및 유저호출, 팔로우 && 좋아요

사용할 프론트: nunjucks

사용할 서버: node express

사용할 DB: mysql

사용할 기본 모듈:
express - 서버용
nodemon - 서버 watcher 용
morgan - consol log용
bcrypt - 비밀번호 암호화용
cookie-parser - 쿠키 사용용
dotenv - 비밀키 저장용
express-session - 세션용
nunjucks - 프론트용

사용할 기능 모듈:
passport - 로그인 기능
passport-local - 로컬 로그인용
multer - 포스트 기능
socket.io@2 - 실시간 DM 용


----------------------------front----------------------------

페이지: {
	index.html - 메인 페이지
	
	new_post.html - post 올리는 페이지
	
	login.html - 로그인 페이지
	
	profile.html - 페이지
	
	follow.html - 팔로우 페이지
}

만들기 완료!
----------------------------DB----------------------------

데이터 베이스: nodeInstagram

User
	id
	email
	password
	nick
	
follow
	id
	followerId
	followingId

Post
	id
	userId
	img
	content
	time

comment
	id
	postId
	comment
	time

Hashtag
	id
	title

PostHashtag
	id
	postId
	hashtagId

Good
	id
	userId
	postId
	
Room
	id
	aId
	bId

DM
	id
	roomId
	sendUserId
	receiveUserId
	content
	time
	
Domain
	id
	userId
	host
	type // 0 - free, 1 - premium
	clientSecret VARCHAR(37)

문제:
Room을 만들까 만들지 않을까?
----------------------------REST API(라우터)----------------------------

메인 페이지 이동
get /main
로그인 페이지 이동
get /login
로그인
post /auth/login
회원가입
post /auth/join
내 프로파일
get /profile
검색
get /search:contents?hashtag=
포스트 올리기, 삭제
post /post, delete/post
댓글 쓰기, 삭제
post /comment:postId, delete/comment:postId
팔로우, 취소
get /follow:userId, delete/follow:userId
좋아요, 취소
get /good:postId, delete/good:postId
DM 창

설계 완료!

2. 프론트, 모듈, 라우터, DB 연동

https://jacobgrowthstory.tistory.com/19

서버 app.js에 각종 사용할 모듈들을 연동한다.
/config	-> DB 연동
/models -> db Models
/passport -> passport 연동
/routes -> 라우터 연동
/views -> nunjucks 연동
/public -> multer + nunjucks
.env -> dotenv
app.js -> 서버


----------------------------프론트 연동----------------------------
index.html
	user + good->postIds, following, follower
	DM
	posts
	
new_post.html
	user
	
login.html
	
profile.html
	user
	
follow.html
	user
----------------------------mysql 연동----------------------------
user
	get

post
	get
	
posthashtag
	get


----------------------------라우터 연동----------------------------

indexRouter

	get('/') -> 메인 페이지 이동
	
	get('/login') -> 로그인 페이지 이동

	get('/pofile') -> 프로파일 페이지 이동
	
	get('/post') -> 포스트 페이지 이동
	
	
	get('follow:id')
	delete('follow:id')
	
	get('good:id')
	delete('good:id')
	
	get('comment:postid')
	
	DM
	
AuthRouter
	post('/login') -> 로그인 실행
		req.body -> email, password
		passport 
		fails-> return error + no
		success-> return '/' + user
		
	post('/join') -> 회원가입 실행
		req.body -> email, password, nick
		models.create(email, password, nick)
		fails->
		success-> return '/login'
	
Profile
		
	
Post
	