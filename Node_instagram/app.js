//다른 사람들이 만든 모듈
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const nunjucks = require('nunjucks');
const passport = require('passport');
const methodOverride = require('method-override');

// 내가 만든 모듈 or 미리 설정한 값 가져옴 

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const profileRouter = require('./routes/profile');
const passportConfig = require('./passport'); //passport 설정들 가져옴
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");


// server 코드 시작 및 각종 설정
const app = express();
app.set('port', process.env.PORT || 8002);
app.set('view engine', 'html');
nunjucks.configure('views', {
	express: app,
	watch: true,
});
passportConfig();
const sessionMiddleware = session({
	resave: false, // cookie 바뀐 거 없어도 다시 쿠키 저장 false.
	saveUninitialized: false, // cookie가 처음 부터 없어도 저장 false.
	secret: process.env.COOKIE_SECRET,
	cookie: {
		httpOnly: true, //유저가 쿠키가지고 장난 칠 수 없게함. javascript 사용 금지!
		secure: false, // https 프로토콜에서만 사용한다!를 false로 함. 배포시 true로 바꾸자.
	}
});

// 미들웨어 장착
app.use(morgan('dev'));//log 확인용
app.use(express.static(path.join(__dirname, 'public'))); //사용자가 public 폴더안의 것 사용
app.use('/img', express.static(path.join(__dirname, 'uploads'))); // + 사용자는 img로 보임
app.use(express.json()); // body의 json들을 객체로 만들어줌.
app.use(express.urlencoded({ extended: false})); // body의 url들을 객체로 만들어 줌.
app.use(cookieParser(process.env.COOKIE_SECRET)); //Header에 쿠키값들 req.cookie 객체에 담아줌, 서명함. -> 
app.use(sessionMiddleware);	//req.session 이라는 객체가 생성.
app.use(passport.initialize());	//new LocalStrategy 생성자 생성
app.use(passport.session());	//req.isAuthenticated,req.login 등의 객체 등록
app.use(methodOverride('_method'));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));// UI와 옵션을 Express Router 환경에 연결
// url/api-docs 경로로 접속하면 기본 설정 보임 이후 API 문서화를 진행해야 함.

//라우팅
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/profile', profileRouter);

//에러 처리 미들웨어
app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

//서버 리스닝
const server = app.listen(app.get('port'), ()=> {
	console.log(`서버가 ${app.get('port')}에서 실행 중`);
});