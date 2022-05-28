const passport = require('passport');
const local = require('./localStrategy');

const { items } = require('../models/items');

module.exports = () => {
	passport.serializeUser((user, done) => {
		console.log(user);
		done(null, user.email);
	});
	
	passport.deserializeUser( async (email, done) => {
		/*
		try{
			let [rows, fields] = await con.query(`SELECT * FROM User Where id = ?`, id);
			const user = rows[0];
				[rows, fields] = await con.query('SELECT * FROM Follow JOIN User ON Follow.followingId = User.id Where Follow.followerId = ?', id);
				user.Followers = rows;
				[rows, fields] = await con.query('SELECT * FROM Follow JOIN User ON Follow.followerId = User.id WHERE Follow.followingId = ?', id);
				user.Followings = rows;
				[rows, fields] = await con.query('SELECT * FROM Good JOIN User ON Good.userId = User.id WHERE User.id = ?', id);
				user.GoodPostId = rows;
				done(null, user);
		} catch (error) {
			console.error(error);
			done(error);
		}
		*/
		console.log(email);
		done(null, items.User.getOne(email));
	});
	
	local();
}