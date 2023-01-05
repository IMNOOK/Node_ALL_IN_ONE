//Loggin

/*
	isLoggedIn, isNotLoggedIn => passport의 req.isAuthenticated() 메소드를 통해
	현재 로그인이 되어있는 상태를 판단하여 next나 error를 반환하는 미들웨어
*/

exports.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login')
	}
};
	  
exports.isNotLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()){
		next();
	} else {
		const message = encodeURIComponent('로그인한 상태입니다.');
		res.redirect(`/?error=${message}`);
	}
};