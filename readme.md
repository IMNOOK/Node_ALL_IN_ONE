# ![camera](https://github.githubassets.com/images/icons/emoji/unicode/1f4f7.png) 인스타그램 클론 코딩

NodeJs 교과서를 통해 배운 내용을 스스로 적용하여 시도하는 첫 프로젝트입니다.

Node.js 교과서를 공부하며 배운 내용 정리본은 블로그에서 확일하실 수 있습니다. 
https://blog.naver.com/leeminwok/222778419100


# ![thinking](https://github.githubassets.com/images/icons/emoji/unicode/1f914.png) 0. 구상

먼저 어떤 기능을 하는 웹 페이지를 만들지 구상합니다.

sns 기능을 하는 웹 페이지를 기획 해본다.

Sns의 기본이 되는 게시물을 올리고 댓글을 달 수 있게 한다.
 - 게시물에는 태그, 사진, 글을 올릴 수 있으며 유저를 호출하여 알림을 줄 수 있다.
 - 댓글을 통해 게시물에서 관련된 대화를 할 수 있으며 여기서 또한 유저를 호출하여 알림을 줄 수 있다.
 - 메인페이지에서는 팔로우한 사람들의 새로운 게시물을 확인할 수 있으며 밑에 내리면 모르는 사람들의 새로운 게시물을 확인할 수 있도록 한다.
 - 게시물에서 바로 팔로우를 할 수 있다.

계정의 정보가 들어가 있는 프로필에서 본인의 사진이나 상태메세지를 수정할 수 있다.
 - 프로필 사진, 상태 메세지를 수정할 수 있으며, 팔로워나 팔로윙의 상대를 알 수 있다.
 - 내가 여태까지 올린 게시글을 한눈에 볼 수 있게 하며 게시글을 클릭할시 해당 게시글로 이동한다.

게시글을 올리는 곳
 - 사진을 올리고 태그나 글로 게시물을 작성하여 올릴 수 있는 공간으로 사진을 올리면 미리보기를 통해 사진을 확인할 수 있다.

DM
 - 팔로잉한 사람이나 기존에 DM을 보낸적이 있는 사람들에게 DM을 통해 간단한 이미지나 문자를 보내거나 받을 수 있다.

회원가입, 로그인 기능
 - 해당 유저가 어떤 유저인지를 확인할 수 있다.


# ![thinking](https://github.githubassets.com/images/icons/emoji/unicode/1f914.png) 1. 기획

구상한 웹의UI 모델링을 제작함으로써 어떤 디자인을 가진 UI를 통해 서비스를 제공할지 결정합니다.
보통의 디자이너는 PPT를 통해 많이 하지만 간단하게 ovenapp 을 통해 페이지를 기획했습니다.

https://ovenapp.io/project/H74UvSHifgHqPYXfGzDvTmvZCPjSr08W#P3cGu

기획한 내용을 토대로 필요한 기능을 디자인하여 완성했을 때의 웹 페이지와 동작을 확인합니다.
 - 디자인을 공부하지 않았기 때문에 instagram을 보며 따라해보았습니다.

설계하면서 UI를 통해 서버와 어떻게 요청할지 구상합니다.

## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 2.1 DB

기획한 UI를 토대로 개념적 데이터 모델링을 통해 실질적으로 DB에 저장해야할 객체를 구상합니다.

ERD에 구상한 데이터를 그려보며 어떤 모양을 하는지 구체적으로 정합니다.
![a](https://user-images.githubusercontent.com/51530880/173850440-a2eda00f-3e0f-44cf-904d-07e20b57fb54.png)

주소: https://www.erdcloud.com/d/fojR3JHRiKhFcM6Zs

참고한 내용: https://www.youtube.com/watch?v=Y1FbowQRcmI

ERD를 바탕으로 논리적 데이터 모델링과 제 3정규화까지 진행했습니다.

1 Atomic columns -> 컬럼의 값은 하나!
2 No parital dependencies -> 표의 기본키 중에 중복키인 것이 없어야 한다!
3 No transitive dependencies -> 이행적 종속성을 없애라!
블로그에 정리해야 겠다.

7.31 수정 본

	모든 키 = id(INT) NOT NULL AUTO_INCREMENT, PRIMARY KEY(id)

	User: email(VC), nick(VC), password(VC), provider(VC), snsId(VC), img(VC)
	Post: userId(INT), usernick(VC), userImg(VC), content(VC), img(VC), date
	Hashtag: title(VC)
	Domain: userId(INT), host(VC), type(INT), clientSecret(VARCHAR),
	Follow: followingId(INT), followerId(INT)
	Good: userId(INT), postId(INT)
	Room: aId(INT), bId(INT)
	DM: roomId(INT), senderId(INT), content(VC), date
	Comment: userId(INT), userNick(VC), userImg, postId(INT), content(VC)
	PostHashtag: postId(INT), hashtagId(INT)

이후에 Mysql을 통해 필요한 쿼리들을 작성해보았습니다.

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

이후에 실질적으로 사용될 데이터 테이블을 작성한다. 

## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 2.2 프론트 엔드

ovenapp을 토대로 만든 html, css, js을 작성하고.
DB에서 만든 실질적으로 사용할 데이터 테이블을 토대로 서버에서 가져와서 사용할 부분을 만들어 놓고

나중에 서버에 swagger을 통해 해당 내용을 서버에 요청하는 url만 입력하면 되겠금 만든다.

## ![sunglasses](https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png) 2.3 백엔드

Nodejs를 통해 서버를 제작했습니다.
MVC모델링을 통해
서버에 요청이 오면
라우터를 통해 해당 요청을 받는 Controller가 응답해야할 처리를 한 후,
해당 데이터를 가공하여 M(모델)에 담아 V로 전달하면
V에서 반환할 전체적인 것을 WAS를 통해 구현 하고 사용자에게 전달하는 방식을 하고 있다.

요청에는 정적인 요청과 동적인 요청이 있는데,
정적인 요청을 서버에서 바로 그 값을 사용자에게 넘겨주면 되는 반면
동적인 요청을 서버에서 WAS(웹 애플리케이션 서버)에게 넘겨주어서 실행시킨 후 사용자에게 넘겨줘야 한다.

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

설계 및 구현 이후
Swagger OPEN API를 사용해보며 FRONT와의 협업에 어떻게 사용될지 알아보았습니다.

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

9. Swagger
 -> https://any-ting.tistory.com/105

10. socket
	-> webSocket
	-> Socket.IO
	블로그 정리 필요

11. sns에서 Room DB를 생성할 때, 어떻게 해야 A와 B 각각에서 1개의  DB만을 생성하고 찾기가 쉬울까?

12. socket으로 html을 추가할때에는 createElement div로 하나 만들고 div.innerHTML =``으로 코드 박아버리기!

13. axios.post 에서 data 보내서 그쪽에서 req.body로 받을려면 data{} 객체 안에 담아야 한다.
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