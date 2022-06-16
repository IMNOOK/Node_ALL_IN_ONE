# ![camera](https://github.githubassets.com/images/icons/emoji/unicode/1f4f7.png) 인스타그램 클론 코딩

NodeJs 교과서를 통해 배운 내용을 스스로 적용하여 시도하는 첫 프로젝트입니다.

## Node.js 교과서를 공부하며 배운 내용
1. nodeBird
- 서버는 요청에 응답하는 것이 핵심이기에 요청을 수락하던 거절하던 반드시 응답해야 한다. (단 한번만)
- 개발 시 서버를 매번 수동으로 재시작하지 않으려면 nodemon을 사용하자.
- dotenv 패키지와 .env 파일로 유출되면 안되는 비밀 키를 관리하자.
- 라우터는 routes 폴더에, 데이터베이스는 models 폴더에, html 파일은 views 폴더에 구분하여 저장하면 프로젝트를 관리하기 쉽다.
- 데이터베이스를 구성하기 전에 데이터 간 1:1, 1:N, N:M 관계를 잘 파악하자.
- routes/middlewares.js 처럼 라우터 내에 미들웨어를 사용할 수 있다.
- Passport 인증 과정을 기억하자. 특히 serializeUser와 deserializeUser가 언제 호출되는지 파악하자.
- 프런트엔드 form 태그의 인코딩 방식이 multipart일 때는 multer 같은 multipart 처리용 패키지를 사용하자.

2. nodeApi
- API는 다른 애플리케이션의 기능을 사용할 수 있게 해주는 창구이다.
- 모바일 서버를 구성할 때 서버를 REST API 방식으로 구현하면 된다.
- API 사용자가 API를 쉽게 사용할 수 있도록 사용 방법, 요청 형식, 응답 내용에 관한 문서를 준비하자.
- JWT 토큰의 내용은 공개되면 변조될 수 있다. 단, 시그니처를 확인하면 변조되었는지 확인할 수 있다.
- 토큰을 사용하여 API의 오남용을 막는다. 요청 헤더에 토큰이 있는지를 항상 확인하는 것이 좋다.
- app.use 외에도 router.use 를 활용하여 라우터 간에 공통되는 로직을 처리할 수 있다.
- cors나 passport.authenticate 처럼 미들웨어 내에서 미들웨어를 실행할 수 있다. 미들웨어를 선택적으로 적용하거나 커스터마이징할 때 이 기법을 사용한다.
- 브라우저와 서버의 도메인이 다르면 요청이 거절된다는 특성(CORS)를 이해하자. 서버간에는 CORS 문제가 발생하지 않는다.

3. nodeTest
- 테스트를 작성한다고 해서 에러가 발생하지 않는 것은 아니다. 하지만 자시의 코드의 믿음을 가질 수 있다.
- 테스트를 올바르게 작성하지 않으면 테스트를 하지 않은 것보다 못한 상황이 발생한다.
- 테스트를 작성하면 나중에 코드 변경 사항이 생겼을 때 어떤 부분에 영향을 미치는지 쉽게 파알 할 수 있다.
- 실제 서비스에서는 모든 기능을 테스트하기가 어려우므로 우선순위를 정하여 우순선위가 높은 기능 위주로 테스트 한다.

4. git-chat
- 웹 소켓과 HTTP는 같은 포트를 사용할 수 있으므로 따로 포트를 설정할 필요가 없다.
- 웹 소켓은 양방향 통신이므로 서버뿐만 아니라 프런트엔드 쪽 스크립트도 사용해야 한다.
- Socket.IO를 사용하면 웹 소켓을 지원하지 않는 브라우저에서까지 실시간 통신을 구현할 수 있다.
- Sokcet.IO의 네임스페이스와 방 구분을 통해 실시간 데이터를 필요한 사용자에게만 보낼 수 있다.
- app.set('io', io)로 소켓 객체를 익스프레스와 연결하고, req.app.get('io')로 라우터에서 소켓 객체를 가져오는 방식을 기억하자.
- 소켓 통신과 함께 데이터베이스 조작이 필요한 경우, 소켓만 해결하지 보다는 HTTP 라우터를 거치는 것이 좋다.

5. nodeAuction
- 서버에서 클라이언트로 보내는 일방향 통신은 웹 소켓 대신 서버센트 이벤트를 사용해도 된다.
- 기존 입찰 내역은 데이터베이스에서 불러오고, 방 첨여 후에 추가되는 내역은 웹 소켓에서 불러온다. 이 둘을 매끄럽게 연결하는 방법을 기억하자.
- 코드가 길어질 것 같으면 app.js 로 부터 socket.js와 checkAuction.js 처럼 분리하자.
- 사용자의 입력값은 프런트엔드와 백엔드 모두에서 체크하는 것이 좋다.
- 스케줄링을 통해 주기적으로 일어나는 작업을 처리할 수 있지만, 노드 서버가 계속 켜져 있어야만 하므로 서버가 꺼졌을 때 대처할 방법을 마련해야 한다.

6. cli
- 노드는 단순히 서버가 아니라 자바스크립트를 실행하는 런타임이라는 점을 기억하자.
- npm에는 서버를 위한 패키지 뿐만 아니라 다양한 프로그램을 위한 패키지도 준비되어 있다.
- 다른 사람이 사용할 것을 감안하여 명령어에 대한 설명을 자세히 적자.
- 프로그래머의 소양 중 하나는 DRY(중복 제거) 이다. 간단한 프로그램만으로도 의미 없는 단순 작업을 줄일 수 있다.

7. AWS와 GCP로 배포

# ![thinking](https://github.githubassets.com/images/icons/emoji/unicode/1f914.png) 기능명세서

1. 설계
먼저 어떤 기능을 하는 웹 페이지를 만들지 구상하고
ovenapp 을 통해 페이지를 설계해 봅니다.

https://ovenapp.io/project/H74UvSHifgHqPYXfGzDvTmvZCPjSr08W#P3cGu

## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) DB

설계한 데이터를 토대로 개념적 데이터 모델링을 하고
![a](https://user-images.githubusercontent.com/51530880/173850440-a2eda00f-3e0f-44cf-904d-07e20b57fb54.png)

주소: https://www.erdcloud.com/d/fojR3JHRiKhFcM6Zs

ERD를 바탕으로 논리적 데이터 모델링과 제 3정규화까지 진행해 보았다.

1 Atomic columns -> 컬럼의 값은 하나!
2 No parital dependencies -> 표의 기본키 중에 중복키인 것이 없어야 한다!
3 No transitive dependencies -> 이행적 종속성을 없애라!
블로그에 정리해야 겠다.

이후에 Mysql을 통해 필요한 쿼리들을 작성해보았다.

메인 페이지

    글 가져 오기 (page)
    SELECT * FROM Post orders LIMIT 10 OFFSET ?
    
    hashtag 검색한 글 가져오기 (title, page)
    SELECT *  LIMIT 10 OFFSET ?

    각 글마다 좋아요 가져오기 (postId)
    SELECT * FROM Good WHERE postId = ? (Join) 

    좋아요하기 (userId, postId)
    insert into Good (userId, postId) Values(?, ?)

    좋아요 취소하기 (userId, postId)
    delete from Good Where Good.userId = ? AND Good.postId = ? 

    팔로우하기 (following, follower)
    insert into Follow (following, follower) Values (?, ?) 

    팔로우 취소하기 (following, follower)
    delete from Follow Where following = ? and follower = ?

    댓글 달기 (content, postId, usernick)
    insert into Comment (content, postId) Values (content, postId, usernick)

    각 글마다 댓글 가져오기
    SELECT * FROM Comment WHERE postId = ? (Join)

    Room 추가 하기(userA, userB)
    Insert into Room (userA, userB) Values(?,?)

    Room 목록 가져오기(userId)
    SELECT * FROM Room Where userA = ? Or userB =?

    DM 읽기(roomId, page)
    SELECT * FROM DM Where roomId = ? LIMIT 100 OFFSET ?

    DM 보내기 & 받기 (roomId, content, sender)
    INSERT INTO DM (roomId, content, sender) VALUES (?, ?, ?)
    
로그인 페이지

    유저 있는지 확인
    SELECT email FROM User Where email = ?

    유저 추가
    insert into User (email, password, userNick) values (?,?,?)

    비밀번호 확인하기
    SELECT password FROM User Where email = ?

포스트 페이지

    글 쓰기
    insert into Post (userId, content, img) values (?,?,?)

    글 수정하기

프로필 페이지

    팔로잉, 팔로워 숫자 보기

    팔로워 유저 보기

    팔로우 취소하기 (following, follower)
    delete from Follow Where following = ? and follower = ?
    팔로잉 유저 보기

    내가 게시한글 보기


마지막으로 물리적 데이터 모델링 (성능 향상 중요!)
find slow query -> 교정 필요
교정 방법 
1. index -> 쓰기 할 때 복잡한 전상 과정이 필요 + 더 많은 저장 공간 필요 but 읽기 빠름
2. 캐시
하지만 이럼에도 불가능 할 경우
역정규화(엄청난 희생이 생길 수 있음)을 실시한다.

즉 보통 JOIN은 엄청 비싼 자원인데, 이것이 많이 필요한 쿼리 같은 경우에는
교정이 불가능할 경우 역정규화를 통해 표를 바꾼다.

컬럼 중복
파생 컬럼의 형성
컬럼을 기준으로 테이블 분리(샷잉)
행을 기준으로 테이블 분리
지름길을 만든다


## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 백엔드
이후에 웹 페이지와 DB를 연결하기 위한 API를 구상해 본다.
Swagger API를 사용하였다.

2. 구현
구상한 모든 것들을 구현한다.

front 
views/html
public/css

DB
config/mysql

RestApi
/routes


3. 연결
서버 app.js를 먼저 구상하고 필요한 모듈을 모두 연결한다.
이후에 front를 연결하고 Rest API를 연결하고 DB를 연결하여 완성시킨다. 

4. 테스트

5. 배포


## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 프론트 엔드
ovenapp을 토대로 만든 html, css, js에 swagger을 토대로 서버와 연동시킨다.

-front-
메인 페이지
	사용자의 팔로우된 사람들의 게시물을 우선적으로 가져옵니다. 이후 랜덤 게시물을 가져온다.
	게시물에는 로그인된 글쓴이가 글과 그림을 올릴 수 있으며 @기능으로 유저를 호출하거나 #기능으로 해시태그를 달 수 있다.
	게시물에는 좋아요와 해당 글쓴이를 팔로우 할 수 있는 버튼이 있다.
	게시물에는 로그인된 유저 모두가 댓글을 달 수 있으며 이때 @기능으로 유저를 호출할 수 있다.
	만약 글쓴이가 본인이라면 게시물을 삭제할 수 있는 버튼이 활성화 된다.
	DM이 왔을 경우 DM창이 뜨며 클릭시 모달창이 올라와 DM을 주고 받을 수 있다.
	
로그인 페이지
	로그인할 수 있으며 회원가입을 클릭하면 모달창이 올라와서 회원가입을 할 수 있다.
	
프로필 페이지
	본인이 올린 모든 게시물을 볼 수 있으며, 삭제할 수 있다.
	본인으 follow 수와 following 수를 확인할 수 있다.
	
포스트 페이지 
	게시물을 올릴 수 있는 곳이다.

## 사용한 패키지

-   **Express**  　　　=> node.js의 웹 프레임워크
-   **eslint**　　　　=> node.js에서 팀 단위 협업시, 문법 검사를 해보자
-   **prettier**　　　=> node.js에서 팀 단위 협업시, 코딩 스타일을 통일해보자
-   **cors**　　=> node.js에서 cors 문제를 해결해보자
-   **nodemon**　　=> node.js에서 파일 수정시 자동으로 서버를 내렸다가 올려보자
-   **bcrypt**　　=> node.js에서 데이터베이스에 저장할 비밀번호를 암호화 해보자
-   **multer**　　=> node.js에서 프론트 엔드에서 보내주는 이미지 데이터를 받아보자
-   **jwt**　　=> node.js에서 jwt 토큰을 이용한 로그인 기능을 구현해보자

## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) To Study


## ![hammer_and_wrench](https://github.githubassets.com/images/icons/emoji/unicode/1f6e0.png) 보안해야 할 점
