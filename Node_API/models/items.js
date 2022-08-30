const con = require('./con');

const items = {
	User:{
		
		check: async (email) => {
			try{
				const [rows, fields] = await con.query(`SELECT * FROM User WHERE User.email = ?`, email);
				if (rows.length != 0) {
					return rows[0];
				}
				return 0;	
			} catch (err) {
				console.log(err);
				return
			}
		},
		
		getOne: async (userId) => {
			const [rows, fields] = await con.query(`SELECT * FROM User WHERE User.id = ?`, userId);
			return rows[0]; 
		},
		
		set: async (email, nick, password, img) => {
			try{
				let result = await con.query(`INSERT INTO User(email, nick, password, img) VALUES (?,?,?, ?)`, [email, nick, password, img]);
				return result[0].insertId;
			} catch (err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
		
		update: async (nick, img, userId) => {
			try{
				await con.query(`UPDATE User SET nick = ?, img =? WHERE id = ?`, [nick, img, userId]);
			} catch (err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
	},
	
	Domain: {
		set: async (userId, userNick, host, type, clientSecret) => {
			try{
				let result = await con.query(`INSERT INTO Domain(userId, userNick, host, type, clientSecret) VALUES (?,?,?,?,?)`, [userId, userNick, host, type, clientSecret]);
				return result[0].insertId;
			} catch(err) {
				console.error(err);
				return 0;
			}
		},
		
		getAll: async (userId) => {
			try{
				const [rows, fields] = await con.query(`SELECT * FROM Domain WHERE Domain.userId = ?`, userId);
				return rows; 
			} catch(err) {
				console.error(err);
			}
		},
		
		getByClientSecret: async (secret) => {
			const [rows, fields] = await con.query(`SELECT * FROM Domain WHERE Domain.clientSecret = ?`, secret);
			return rows[0];
		}
		
	},
	
	Follow: {
		getFollowings: async (userId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Follow WHERE followingId = ?`, userId);
			return rows;
		},
	},
}

module.exports = items;