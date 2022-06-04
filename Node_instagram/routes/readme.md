1. / (페이지 이동)
	get /
	get 	/login
	get 	/join
	get 	/new_post
	
2. auth (로그인)
	post	/join		회원가입
	post	/login		로그인
	get		/logout		로그아웃
	
3. post (게시글)
	post	/				포스트올리기
	get		/search:tag		검색
	get		/comment:postId	댓글
	get		/good:postId	좋아요
	delete	/good:postId	좋아요 취소
	
4. profile
	get 	/			내 게시글 가져 오기
	post	/			정보 변경
	get		/follow:id
	delete	/follow:id
	

5. dm (DM)
	get		/				Room들 보여줌
	get		/room:roomId	DM들을 보여줌
	post	/DM:roomId		DM을 보냄
	get 	/DM:roomId		DM을 가져옴 (소켓 프로그램)