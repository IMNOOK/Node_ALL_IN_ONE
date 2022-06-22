const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const items = require('../models/items');

//LocalStrategy({name: 'Field', password: 'Field'}, function(name, password, done) => {})
//function(name, password, done) => { done(error, user, message) }

module.exports = () => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
	}, async (email, password, done) => {
		try{
			const rows = await items.User.check(email);
			console.log(rows);
			if(rows.length != 0) {
				const result = await bcrypt.compare(password, rows.password);
				if(result) {
					done(null, rows);
				} else {
					done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
				}
			} else {
				done(null, false, {message: '가입되지 않은 회원입니다.'});
			}
		} catch (error){
			console.error(error);
			done(error);
		}
	}));
};