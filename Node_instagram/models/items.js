const con = require('./con');

const items = {
	
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
			const [rows, fields] = await con.query(`SELECT * FROM User INNER JOIN Post ON User.id = Post.userId WHERE User.id = ?`, userId);
			return rows; 
		},
		
		set: async (email, nick, password) => {
			try{
				await con.query(`INSERT INTO User(email, nick, password) VALUES (?,?,?)`, [email, nick, password]);
			} catch (err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
		
		update: (nick, email, img, userId) => {
			try{
				await con.query(`UPDATE User SET nick = ?, email = ?, img =? WHERE userId = ?`, [email, nick, img, userId]);
			} catch (err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
		
		/*
		delete: () => {
			
		},
		*/
	},
		
	Post: {
		getAll: async (page = 0) => {
			page = page * 10;
			const [rows, fields] = await con.query(`SELECT * FROM Post ORDERS LIMIT 10 OFFSET ?`, page);
			return rows;
		},
		
		getByUserId: async (id) => {
			const [rows, fields] = await con.query(`SELECT * FROM Post WHERE userId = ?`, id);
			return rows;
		},
		
		getByHashtag: async (title, page) => {
			page = page * 10;
			const [rows, fields] = await con.query(`SELECT * FROM Post inner JOIN PostHashtag ON Post.id = PostHashtag.postId inner join Hashtag on Hashtag.id = PostHashtag.hashtagId WHERE Hashtag.title = ? ORDERS LIMIT 10 OFFSET ?`, [title, page]);
			return rows;
		},
		
		set: async (userId, content, img) => {
			try{
				await con.query(`INSERT INTO Post(userId, content, img) VALUES (?,?,?)`, [userId, content, img]);
			} catch(err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
		
		update: async (content, img, postId) => {
			try{
				await con.query(`UPDATE Post SET content =?, img = ? WHERE postId = ?`, content, img, postId);
			} catch(err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
		
		delete: async (postId) => {
			con.query(`DELETE FROM Post WHERE postId = ?`, postId);
		}
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
		},
		
		set: async (userId, postId) => {
			try{
				await con.query(`INSERT INTO Good (userId, postId) Values(?, ?)`, userId, postId);
			} catch(err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
		
		delete: async (userId, postId) => {
			await con.query(`DELETE FROM Good WHERE userId = ? AND postId = ?`, userId, postId);
		}
	},
	
	Comment: {
		getByPostId: async (postId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Comment WHERE postId = ?`, postId);
			return rows;
		},
		
		set: async (content, postId, userId, userNick) => {
			try{
				await con.query(`INSERT INTO Comment (content, postId, userId, userNick) Values (?, ?, ?, ?)`, content, postId, userId, userNick);
			} catch(err) {
				console.error(err);
				return 0;
			}
		}		
	},
	
	Follow: {
		getFollowing: async (userId) => {
			const [rows, fields] = await con.query(`SELECT * Follow FROM WHERE followerId = ?`, userId);
			return rows.length;
		},
		
		getFollower: async (userId) => {
			const [rows, fields] = await con.query(`SELECT * Follow FROM WHERE followingId = ?`, userId);
			return rows.length;
		},
		
		
		set: async (userId, followerId) => {
			try{
				await con.query(`INSERT INTO Follow (following, follower) VALUES (?, ?)`, userId, followerId);
			} catch (err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
		
		delete: async (userId, followerId) => {
			await con.query(`DELETE FROM Follow WHERE following = ? AND follower = ?`, userId, followerId);
		}
	},
	
	
	Hashtag: {
		set: async (title) => {
			try{
				await con.query(`INSERT INTO Hashtag (title) VALUES(?)`,title);
			} catch(err) {
				console.error(err);
				return 0;
			}
			return 1;
		}
	},
	
	Room: {
		getByUserId: async (userId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Room WHERE aId = ? OR bId = ?`, userId, userId);
			return rows;
		},
		
		set: async (userAId, userBId) => {
			try{
				await con.query(`INSERT INTO Room (aId, bId) VALUES`, userAId, userBId);
			} catch(err){
				console.error(err);
				return 0;
			}
		}
	},
	
	DM: {
		getByRoomId: async (roomId) => {
			const [rows, fields] = await con.query(`SELECT * FROM DM WHERE roomId = ?`);
			return rows;
		},
		
		set: async (roomId, content, sender) => {
			try{
				await con.query(`INSERT INTO DM (roomId, content, sender) VALUES (?, ?, ?)`, roomId, content, sender);
			} catch (err){
				console.error(err);
				return 0;
			}
		}
	},
	
	/*
	
	Domain: {
		
	},
	
	*/
}

module.exports = items;