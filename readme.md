# ![camera](https://github.githubassets.com/images/icons/emoji/unicode/1f4f7.png) 인스타그램 클론 코딩

NodeJs 교과서를 통해 배운 내용을 스스로 적용하여 시도하는 첫 프로젝트입니다.

Node.js 교과서를 공부하며 배운 내용 정리본은 블로그에서 확일하실 수 있습니다. 
https://blog.naver.com/leeminwok/222778419100


# ![thinking](https://github.githubassets.com/images/icons/emoji/unicode/1f914.png) 0. 구상

먼저 어떤 기능을 하는 웹 페이지를 만들지 구상합니다.
Instagram의 기능을 하는 웹 페이지를 클론 해본다.
이후에 API서비스를 제공하여 

# ![thinking](https://github.githubassets.com/images/icons/emoji/unicode/1f914.png) 1. 기획

구상한 웹의UI 모델링을 제작함으로써 어떤 디자인을 가진 UI를 통해 서비스를 제공할지 결정합니다.
보통의 디자이너는 PPT를 통해 많이 하지만 간단하게 ovenapp 을 통해 페이지를 기획했습니다.

https://ovenapp.io/project/H74UvSHifgHqPYXfGzDvTmvZCPjSr08W#P3cGu

설계하면서 UI를 통해 서버와 어떻게 요청할지 구상합니다.

공통 페이지

	로그아웃

메인 페이지
	
    기본 상태
		글 가져 오기
			유저가 작성했던 글 10개씩 1페이지로 가져오기
			글에는 작성자 닉네임, 내용, 사진, 작성한 시간, 댓글, 좋아요 갯수가 필요하다.
		
	hashtag 검색한 글 가져오기 -> search로 hashtag 검색 -> req.body.title 로 해시태그 전달
		유저가 작성했던 글 중 hashtag.title이 같은 것을 10개씩 1페이지로 가져오기
		이때 각각의 글들에는 마지막에 달린 댓글 1개
		좋아요 갯수

		댓글 보기 -> 파라미터 값으로 postId 전달
			해당 게시글의 모든 댓글을 가져옴
		
	로그인시
		상시
			해당 유저와 팔로우한 유저의 스토리 + 추천유저창 뜸.
			글을 가져 올 때, 회원이 이 사용자를 팔로우 했는지 않했는지, 회원이 이 글을 좋아요 했는지 안했는지 까지 추가
		
		좋아요하기 -> 파라미터  값으로 postId 전달 
			하트 빨간색으로 변경

		좋아요 취소하기 -> 파라미터 값으로 postId 전달
			하트 공백으로 변경

		팔로우하기 -> 파라미터 값으로 userId 전달
			팔로우 표시로 변경
	
		팔로우 취소하기 -> 파라미터 값으로 userId 전달
			미 팔로우 상태로 변경
	
		댓글 달기 -> req.body.content로 내용이 파라미터 값으로 postId 전달
			댓글이 달림
	
		Room 목록 가져오기
			내가 기존에 연락하던 모든 Room들이 전달됨
			Room들에는 다른 회원의 이름, 사진, 마지막 채팅 내용, 마지막 채팅 시간이 들어있음.
	
		Room 열기 -> 파라미터 값으로 roomId 전달
			다른 회원과의 모든 채팅내용을 가져옴
	
		DM 보내기 -> req.body.content로 내용이 파라미터 값으로 roomId 전달
		다른 사용자에게 문자를 보냄, 상대방에게도 event로 생성, 처음 상대와 대화창 열기를 하면 해당 유저와의 Room이 생성됨.

로그인 페이지 & 회원가입 페이지

	기본 상태
		로그인 페이지 or 회원가입 페이지
	
	회원가입
		

	로그인
	로그인되면 메인 페이지로 이동, 안되면 

포스트 페이지

	글 쓰기
	글 수정하기

프로필 페이지

	프로필 정보 수정
	팔로잉, 팔로워 숫자 보기
	팔로워 유저 보기
	팔로우 취소하기 (following, follower)
	팔로잉 유저 보기
	내가 게시한글 보기
	내가 게시한글 삭제하기



## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 2-1. DB

기획한 UI를 토대로 개념적 데이터 모델링을 하고
![a](https://user-images.githubusercontent.com/51530880/173850440-a2eda00f-3e0f-44cf-904d-07e20b57fb54.png)

주소: https://www.erdcloud.com/d/fojR3JHRiKhFcM6Zs

ERD를 바탕으로 논리적 데이터 모델링과 제 3정규화까지 진행했습니다.

1 Atomic columns -> 컬럼의 값은 하나!
2 No parital dependencies -> 표의 기본키 중에 중복키인 것이 없어야 한다!
3 No transitive dependencies -> 이행적 종속성을 없애라!
블로그에 정리해야 겠다.

	모든 키 = id(INT) NOT NULL AUTO_INCREMENT, PRIMARY KEY(id)

	User: email(VC), nick(VC), password(VC), provider(VC), snsId(VC), img(VC)
	Post: userId(INT), usernick(VC), content(VC), img(VC), date
	Hashtag: title(VC)
	Domain: userId(INT), host(VC), type(INT), clientSecret(VARCHAR),
	Follow: followingId(INT), followerId(INT)
	Good: userId(INT), postId(INT)
	Room: aId(INT), bId(INT)
	DM: roomId(INT), senderId(INT), content(VC), date
	Comment: userId(INT), userNick(VC), postId(INT), content(VC)
	PostHashtag: postId(INT), hashtagId(INT)

이후에 Mysql을 통해 필요한 쿼리들을 작성해보았습니다.

User

	유저 확인 
	User.check (email)
	SELECT email FROM User WHERE email = ?
	return rows[0] else 0

	유저 추가 
	User.set (email, password, nick)
	INSERT INTO User (email, password, nick) values (?,?,?)
	return 1 else 0
	
	프로필 정보 수정 
	User.update (nick, email, img, userId)
	UPDATE User SET nick = ?, email = ?, img =? WHERE userId = ?

	
    유저 프로필 보기 
	User.getOne (userId)
	SELECT * FROM User INNER JOIN Post ON User.id = Post.userId WHERE User.id = ?
	return rows;
	
	
Post

    글 쓰기 
	Post.set (userId, content, img)
    INSERT INTO Post (userId, content, img) values (?,?,?)
	return 1 else 0
	
	글 가져 오기 
	Post.getAll (page)
    SELECT * FROM Post orders LIMIT 10 OFFSET ?
	return rows;
    
    hashtag 검색한 글 가져오기 
	Post.getByHashtag (title, page)
	SELECT * FROM Post inner JOIN PostHashtag ON Post.id = PostHashtag.postId inner join Hashtag on Hashtag.id = PostHashtag.hashtagId WHERE Hashtag.title = ? orders LIMIT 10 OFFSET ?
    return rows;
	
    글 수정하기 
	Post.update (content, img, postId)
	UPDATE Post SET content = ?, img = ? WHERE postId = ?
	return 1 else 0
	
	내가 게시한글 보기
	Post.getByUserId(userId)
	SELECT * FROM Post WHERE userId = ?
	return rows;
	
	내가 게시한글 삭제하기 
	Post.delete (postId)
	DELETE FROM Post WHERE id = ?
	return 0;

Good

    각 글마다 좋아요 수 가져오기
	Good.getByPostId (postId)
    SELECT * FROM Good WHERE postId = ? (Join)
	return rows.length;

    좋아요하기
	Good.set (userId, postId)
    INSERT INTO Good (userId, postId) Values(?, ?)
	return 1 else 0;

    좋아요 취소하기 
	Good.delete (userId, postId)
    DELETE FROM Good WHERE Good.userId = ? AND Good.postId = ?
	return none;

Follow

    팔로우하기 
	Follow.set (userId, follower)
    INSERT INTO Follow (following, follower) Values (?, ?) 
	return 1 else 0;

    팔로우 취소하기 
	Follow.delete (userId, follower)
    DELETE FROM Follow Where following = ? and follower = ?
	return none;
	
	팔로잉 숫자 보기 
	Follow.getFollowing (userId)
	SELECT * FROM Follow WHERE following = ?
	return rows.length;

	팔로워 숫자 보기 
	Follow.getFollower (userId)
	SELECT * FROM Follow WHERE follower = ?
	return rows.length;
	
Comment

    댓글 달기 
	Comment.set (content, postId, userId, userNick)
    INSERT INTO Comment (content, postId, userId, userNick) Values (?, ?, ?, ?)
	return 1 else 0;

    각 글마다 댓글 가져오기 
	Comment.getByPostId (postId)
    SELECT * FROM Comment WHERE postId = ? (Join)
	return rows;

Room

    Room 추가 하기
	Room.set (aId, bId)
    INSERT INTO Room (aId, bId) Values(?,?)
	return 1 else 0;

    Room 열기 = 목록 가져오기 
	Room.getByUserId (userId)
    SELECT * FROM Room WHERE userA = ? Or userB =?
	return rows;

DM

    DM 읽기
	DM.getByRoomId (roomId)
    SELECT * FROM DM WHERE roomId = ? LIMIT 100 OFFSET ?
	return rows;

    DM 보내기 
	DM.set (roomId, content, sender)
    INSERT INTO DM (roomId, content, sender) VALUES (?, ?, ?)
	return 1 else 0;

    

마지막으로 물리적 데이터 모델링 (성능 향상 중요!)
find slow query를 통해 교정을 합니다.

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

교정한 내용


Models 파일에 items.js에 각각의 쿼리들 저장


## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 2.2 백엔드

사용한 패키지

-   **Express**  　　　=> node.js의 웹 프레임워크
-   **eslint**　　　　=> node.js에서 팀 단위 협업시, 문법 검사를 해보자
-   **prettier**　　　=> node.js에서 팀 단위 협업시, 코딩 스타일을 통일해보자
-   **cors**　　=> node.js에서 cors 문제를 해결해보자
-   **nodemon**　　=> node.js에서 파일 수정시 자동으로 서버를 내렸다가 올려보자
-   **bcrypt**　　=> node.js에서 데이터베이스에 저장할 비밀번호를 암호화 해보자
-   **multer**　　=> node.js에서 프론트 엔드에서 보내주는 이미지 데이터를 받아보자
-   **jwt**　　=> node.js에서 jwt 토큰을 이용한 로그인 기능을 구현해보자
-   **method-override**　　=> node.js에서 form태그로 delete, put 사용을 해보자

라우팅
- 웹 페이지와 DB를 연결하기 위한 REST API를 설계해 보았습니다.
- https://sharplee7.tistory.com/49

1. 명사를 통한 리소스 식별
2. HTTP 헤더에 데이터 포멧 포함
3. GET이나 쿼리 파라미터를 통한 수정 금지
4. 서브 URL 표현식을 통해 세부 표현
5. 행위(verb)를 위한 적절한 HTTP 메소드 사용
6. HTTP 응답 상태 코드 사용
7. 필드명에 대소문자 규칙 적용
8. 검색, 정렬, 필터링 그리고 페이징을 위한 규칙 사용
9. API 버전 관리
10. HATEOAS 적용
11. JSON을 통한 ERROR 응답 처리

라우터

middlewares.js
//미들웨어

	isLoggedIn, isNotLoggedIn => passport의 req.isAuthenticated() 메소드를 통해
	현재 로그인이 되어있는 상태를 판단하여 next나 error를 반환하는 미들웨어

page.js
/:

	//로그인시 변해야할 UI
	use(
		로그인시
			res.locals.user = req.user;
			각 posts 중에 내가 좋아요한 것들 List
			각 유저 중에 내가 팔로우 한 것들 List
			Room창 열기 모달
	)

	//게시글
	get('/?page=params'):
		글 가져 오기 (page)
			각 글마다 좋아요 가져오기 (postId),
			각 글마다 댓글 가져오기 (postId)
		return res.render('index', {title: 'Main', twits: posts});
	
	get('/search/:title') 
		hashtag 검색한 글 가져오기 (title)
			각 글마다 좋아요 가져오기 (postId),
			각 글마다 댓글 가져오기 (postId)
		return res.render('index', {title: 'Main', twits: posts});
		
	//팔로우	
	get('/follow/:userId')
    	팔로우하기 (userId, follower)
	
	delete('/follow/:userId')
    	팔로우 취소하기 (userId, follower)  
    
	//페이지 이동
	get('/login')
		로그인 페이지 이동
		return res.render('login', { title: "로그인"} );

	get('/join')
		회원가입 페이지 이동
		return res.render('join', { title: "회원가입"});
	
	get('/post')
		포스트 페이지 이동
		return res.render('post', { title: "포스트"});
		
		
	get('/profile')
		포스트 페이지 이동
		return res.render('profile', { title: "프로파일"});
		
		
	get('/follow')
		포스트 페이지 이동
		return res.render('follow', { title: "팔로우"});

auth.js
/auth:

	//사용자 계정
	post('/join')
		회원가입:
    		유저 있는지 확인 (email)
				return res.redirect('/join?error=exist');
    		유저 추가 (email, password, nick)
				res.redirect('/');
			
	post('/login')
		passport로그인
			authenticate('local') -> (authError, user, info)
			authError
				return next(authError);
			!user
				return res.redirect('/');
			return req.login(user, (err) => {return redirect('/')}) //passport.serializeUser
		
		-> 로그인 완료시 deserializeUser를 통해 req.user에 유저 세션 저장 -> passport.session() 
			
	get('/logout)
		로그아웃
		req.logout()
		req.session.destroy();
		res.redirect('/');


/post:
	
	fs.readdirSync('uploads') else fs.mkdirSync('uploads')
	multer({ storage( destination, filename ), limits })

	//게시판 글
	post('/img')
		이미지 올리기 (img)	

	post('/')
		글 쓰기 (userId, userNick, img)
		글의 내용 쓰기(댓글)(content, postId, userId, userNick)
		Promise.all(content.match(hashtag).map(async tag => {
			if(해시태그 찾기(title))
			else 해시태그 등록(title)
			PostHashtag(postId, hashtagId)
		}))
		
	delete('/:postId')
		내가 게시한글 삭제하기 (postId)

	//댓글
	post('/:postId')
		댓글달기(comment, postId, userId, userNick)
	
	delete('/:postId')
		댓글 삭제하기(commentId)
	
	//좋아요
	get('/good/:postId')
		좋아요하기 (userId, postId)
		
	detele('/good/:postId)
	좋아요 취소하기 (userId, postId)  

/profile:
	
	//사용자 계정관리
	get('/:userid')
		유저 프로파일 페이지 이동
		유저 정보 보기(userId)
		팔로잉, 팔로워 숫자 보기:
			팔로잉 숫자 보기 (userId)
			팔로워 숫자 보기 (userId)

		유저가 게시한글 보기 (userId)

	update('/:userId')
		프로필 정보 수정 (nick, email, img, userId)
	
/room:

	get('/')
    	Room 열기 = 목록 가져오기 (userId)
	
	post('/')
    	Room 추가 하기(aId, bId)
		
	get('/:roomId')
	    DM 읽기(roomId, page)
		
	post('/:roomId')
    	DM 보내기 (roomId, content, sender)
	

Swagger OPEN API를 사용해보며 FRONT와의 협업에 어떻게 사용될지 알아보았습니다.


## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 2.3 프론트 엔드
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

## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 4. 테스트


## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 5. 배포

## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 6. 막혔던 지점



1. 포스터에 사진 올릴 때
	파일 업로드때 사진만 올릴 수 있도록 설정하기
	올린 파일 미리보기
	multer을 사용하여 사진URL과 글이랑 함꼐 데이터 전송하기
	https://blog.naver.com/leeminwok/222834139988


2. 모든 포스터에 박혀있는 userImg를 Profile에서 업데이트 했을 때 UPDATE CASDE가 안되었음 
 -> FORIGN KEY를 위해서는 외래키가 UNIQUE여야 하며 NOT NULL에 해당 키와 같은 설정 값을 가져야 한다.
 -> userImg가 UNIQUE가 되면 기본설정 img(DEFAULT 이미지)를 넣을 수가 없어짐.
 -> 그럼 User 테이블에 값에는 회원가입시에 nick.png가 들어가며 브라우저에서 잃어올 수 없는 사진(nick.png처럼 존재하지 않는 사진 = 기본 프사)을 바꾼다.
 -> onerror="this.src='/img/기본프사.png'"
 
3. 팔로우 한 사람들의 게시글만 가져오기
 -> Promise.all(follow.followerIds Posts)

4. 모달링

5. delete method 사용 방법
 -> app.js에 methodOverride = require('method-override');
 -> app.use(methodOverride('_method'));
 -> 

6. 각각의 포스터에 toggle을 열었을 때 반응을 한번에 JS로
 -> const more = document.querySelectorAll('.sprite_more_icon');
 -> more.forEach( toggle => {	  
 -> toggle.addEventListener('click', (e) => {
 ->		if(toggle.firstElementChild.style.display == 'inline'){
 ->				toggle.firstElementChild.style.display = 'none';
 ->			}else {
 ->				toggle.firstElementChild.style.display = 'inline';
 ->			}
 ->		})
 -> })

7. passport

8. Promise.all map (post-hashtag)

FRONT
	- modaling
	

DB
	- contraint -> 외래키, 키 모두 not null 설정해야 정상 동작
	- 
	
BACKEND
	- Promise.all() 안에 .map(async callback)을 사용해야 정상 동작
	- 각각의 라우터 단에서의 return 형식 맞추기
	

## ![hammer_and_wrench](https://github.githubassets.com/images/icons/emoji/unicode/1f6e0.png) 보안해야 할 점

FRONT

DB

	보다 많은 정규화 과정과 역정규화의 좋은 예시들을 거치면서 다듬어 가야할 것 같다.
	테스팅을 할 수 있는 사이트도 있으니 찾아보자.

BACKEND

