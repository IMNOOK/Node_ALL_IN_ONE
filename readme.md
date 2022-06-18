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
ovenapp 을 통해 페이지를 설계했습니다.
https://ovenapp.io/project/H74UvSHifgHqPYXfGzDvTmvZCPjSr08W#P3cGu
설계하면서 UI를 통해 서버와 어떻게 요청할지 구상합니다.


## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 2-1. DB

기획한 UI를 토대로 개념적 데이터 모델링을 하고
![a](https://user-images.githubusercontent.com/51530880/173850440-a2eda00f-3e0f-44cf-904d-07e20b57fb54.png)

주소: https://www.erdcloud.com/d/fojR3JHRiKhFcM6Zs

ERD를 바탕으로 논리적 데이터 모델링과 제 3정규화까지 진행했습니다.

1 Atomic columns -> 컬럼의 값은 하나!
2 No parital dependencies -> 표의 기본키 중에 중복키인 것이 없어야 한다!
3 No transitive dependencies -> 이행적 종속성을 없애라!
블로그에 정리해야 겠다.

이후에 Mysql을 통해 필요한 쿼리들을 작성해보았습니다.

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


## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 2.2 백엔드

이후에 웹 페이지와 DB를 연결하기 위한 REST API를 구상해 보았습니다.
Swagger API를 사용하였습니다.


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

## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 3. 연결
서버 app.js를 먼저 구상하고 필요한 모듈을 모두 연결한다.
이후에 front를 연결하고 Rest API를 연결하고 DB를 연결하여 완성시킨다. 

## 사용한 패키지

-   **Express**  　　　=> node.js의 웹 프레임워크
-   **eslint**　　　　=> node.js에서 팀 단위 협업시, 문법 검사를 해보자
-   **prettier**　　　=> node.js에서 팀 단위 협업시, 코딩 스타일을 통일해보자
-   **cors**　　=> node.js에서 cors 문제를 해결해보자
-   **nodemon**　　=> node.js에서 파일 수정시 자동으로 서버를 내렸다가 올려보자
-   **bcrypt**　　=> node.js에서 데이터베이스에 저장할 비밀번호를 암호화 해보자
-   **multer**　　=> node.js에서 프론트 엔드에서 보내주는 이미지 데이터를 받아보자
-   **jwt**　　=> node.js에서 jwt 토큰을 이용한 로그인 기능을 구현해보자


## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 4. 테스트


## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 5. 배포

## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) To Study


## ![hammer_and_wrench](https://github.githubassets.com/images/icons/emoji/unicode/1f6e0.png) 보안해야 할 점
