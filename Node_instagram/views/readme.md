1. layout

	header - 로고, 검색, 아이콘 및 이동
	
	contents - 각 페이지 마다의 컨텐츠

1. error
	
	contents - 에러 내용, 단 develop일 때만 보여줌.

2. index
	
	contents
	- 게시글: SELECT * FROM Post {
		- 게시자: Post.userId Join User.id => User.nick
		- 게시물: Post.img + Post.content + Good.postId.length
		- 게시물 좋아요: -> good/:postId
		- 게시자 팔로우: -> follow/:userId
		- 댓글: Post.id Join Comment.postId => Comment.nick + Comment.content
		- 이미지 다운: -> 
	}

3. login

	contents - 로그인, 회원가입 페이지 이동
	
4. join

	contents - 회원가입
	
5. new_post

	- 게시글 올리기
	
6. profile

	contents - 정보 수정, follow er or ing 확인, 내 게시글 목록 

7. follow



8. DM
	
	contents 
	- Follow한 사람들의 Room. 
	- 클릭하면 modal창 띄워지면서 Room에 입장.
	- Room에서 채팅 가능.