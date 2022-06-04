0. 웹 기능 설계
	만들 웹 기능: SNS
	- 게시글을 올리는 SNS
	- 유저 간에 follow 기능
	- follow한 유저간의 DM 및 소통
	
	필요한 객체들
	- User
	- Follow
	- Post
	- Good
	- Comment
	- Hashtag
	- PostHashtag
	- Room
	- DM
	
	웹 페이지 설계 - views/readme.md
	DB 모델 설계 - models/readme.md
	router 설계 - routes/readme.md

1. 구현
	/config - DB connect
	/models - DB
	/views - html
	/public - css, js
	/routes - REST API
	app.js - server
	+ modules
	/passport - login
	.env - security

2. 연결	(MVC 모델 구현)
	REST API compelet -> 
	
	front - router connect
	
		1. form entype="multipart/form-data" 
		http에서 form을 통해 server에 데이터(req.body)를 전송하는데,
		input 태그를 통해 파일을 넣고, textarea를 통해 문자열을 전송하는 등 말이다.
		보낼 데이터의 종류는 엄청 많고 이미지를 보내더라도 문자를 통해서 데이터를 전달하기 때문에 encoding이 필요하다.
		form entpye은 해당 데이터가 어떤 타입인지 정해 서버에게 인코딩하여 보내기 위함이다.
		이때 우리는 한가지 encoding만 할 수 있는데,
		사진과 글을 동시에 올리는 sns 같은 경우에 동시에 올리기 위해 2개 모두 인코딩하려고 생긴 것이 multipart/form-data이다.
		
		1. axios로 서버에 이미지를 보내는 방법
		이미지 파일은 input 태그로 받아오고, 타입은 file로 받아온다.
		
		<input
			type="file"
			onChange={selectFile}
			ref={fileInput}
			disabled={is_uploading}
		/>
		
		이미지 확인
		onchange로 이벤트 정보를 받아와서 파일의 정보를 확인할 수 있다.
		
		const selectFile = (e) => {
			console.log(e.target.files[0]);
		}
		
		e.target.files는 배열이 아니다.
		
		FormData 객체 만들기
		자바스크립트의 내장 객체인 FormData()로 이미지 파일을 formdata 형식으로 만들 수 있다.
		formData.append('key', 'value')을 사용하면 새로 만들어진 formData에 key:value 형태로 추가된다.
		
		const addPostSP = (data, token) => {
			console.log(data);
			return function (dispatch, getState) {
				const formData = new FormData();
				const _data = { content: "adadad" };
				formData.append("bord", _data);
				formData.append("file", data.image);
				for (let value of formData.values()){
					console.log(value);
				}
			};
		};
		
		서버로 전송하기
		axios의 post 방식으로 보내는데,
		헤더의 토큰과 함께 Content-Type을 multipart/form-data로 설정해서 보내주면 된다.
		
		axios.post("url", formData,  {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		})
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
			window.alert("게시물 작성에 실패했습니다.");
		});
		
	DB - router connect