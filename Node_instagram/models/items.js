const con = require('./con');

const items = {
	
	User:{
		
		getOne: async (email) => {
			const [rows, fields] = await con.query(`SELECT * FROM User WHERE User.email = ?`, email);
			if (rows.length != 0) {
				return rows[0];
			} else {
				return 0;
			}
		},
		
		set: async (email, nick, password) => {
			const [rows, fields] = await con.query(`SELECT * FROM User WHERE User.email = ?`, email);
			if (rows.length != 0) {
				return 0;
			} else {
				try{
					await con.query(`INSERT INTO User(email, nick, password) VALUES (?,?,?)`, [email, nick, password]);
				} catch (error) {
					console.error(error);
					return 0;
				}
				return 1;
			}
		},
		/*
		update: () => {
			
		},
		
		delete: () => {
			
		},
		*/
	},
		
	Post: {
		getAll: async () => {
			const [rows, fields] = await con.query(`SELECT * FROM Post`);
			return rows;
		},
		
		getByUserId: async (id) => {
			const [rows, fields] = await con.query(`SELECT * FROM Post WHERE userId = ?`, id);
			return rows;
		},
		
		set: async (userId, content, img) => {
			try{
				await con.query(`INSERT INTO Post(userId, content, img) VALUES (?,?,?)`, [userId, content, img]);
			} catch(error) {
				console.error(error);
				return 0;
			}
			return 1;
		},
	},
	
	Good: {
		getByPostId: async (id) => {
			const [rows, fields] = await con.query(`SELECT * FROM Good WHERE postId = ?`, id);
			return rows.length;
		},
		
		getByIds: async (userId, postId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Good WHERE postId = ?, userId = ?`, postId, userId);
			if(rows.length == 0) return 0;
			return 1;
		}
	},
	
	Comment: {
		getByPostId: async (id) => {
			const [rows, fields] = await con.query(`SELECT * FROM Comment WHERE postId = ?`, id);
			return rows;
		},
	},
	
	/*
	Hashtag: {
		
	},
	
	Domain: {
		
	},
	
	Follow: {
		
	},
	
	Room: {
		
	},
	
	DM: {
		
	},
	*/
}

module.exports = items;