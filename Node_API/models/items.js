const con = require('./con');

const items = {
	ok: 3,
	User:{
		
		check: async (email) => {
			const [rows, fields] = await con.query(`SELECT * FROM User WHERE User.email = ?`, email);
			if (rows.length != 0) {
				return rows[0];
			} else {
				return 0;
			}
		},
		
		getOne: async (userId) => {
			const [rows, fields] = await con.query(`SELECT * FROM User WHERE User.id = ?`, userId);
			return rows[0]; 
		},

	},
	
	Domain: {
		set: async (userId, host, type, clientSecret) => {
			try{
				let result = await con.query(`INSERT INTO Domain(userId, host, type, clientSecret) VALUES (?,?,?,?)`, [userId, host, type, clientSecret]);
				return result[0].insertId;
			} catch(err) {
				console.error(err);
				return 0;
			}
		},
		
		get: async (userId) => {
			try{
				const [rows, fields] = await con.query(`SELECT * FROM Domain WHERE Domain.userId = ?`, userId);
				return rows; 
			} catch(err) {
				console.error(err);
			}
		}
	},
}

module.exports = items;