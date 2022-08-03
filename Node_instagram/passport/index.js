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
			user.Followings = await items.Follow.getFollowings(userId);
			user.GoodPostIds = await items.Good.getAllByUserId(userId);
			user.rooms = await items.Room.getByUserId(userId);
			done(null, user);
		} catch (err){
			console.error(err);
			done(err, null);
		}
	});
	
	local();
}