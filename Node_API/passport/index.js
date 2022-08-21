const passport = require('passport');
const local = require('./localStrategy');

const items = require('../models/items');

module.exports = () => {
	
	//
	passport.serializeUser((user, done) => {
		console.log(`${user.id}유저 로그인 - passport.index`);
		done(null, user.id);
	});
	
	passport.deserializeUser( async (userId, done) => {
		try{
			const user = await items.User.getOne(userId);
			done(null, user);
		} catch (err){
			console.error(err);
			done(err, null);
		}
	});
	
	local();
}