const passport = require('passport');
const local = require('./localStrategy');

exports.passportConfig = () => {
	
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	
	passport.deserializeUser( async (id, done) => {
		try{
			
			done(null, );
		} catch (error) {
			console.error(error);
			done(error);
		}
	});
	
	local();
}

exports.UserCache = UserCache;