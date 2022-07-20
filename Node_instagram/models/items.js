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
			const [rows, fields] = await con.query(`SELECT * FROM User WHERE User.id = ?`, userId);
			return rows[0]; 
		},
		
		set: async (email, nick, password) => {
			try{
				let result = await con.query(`INSERT INTO User(email, nick, password) VALUES (?,?,?)`, [email, nick, password]);
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
		
		/*
		delete: () => {
			
		},
		*/
	},
	
	Post: {
		getAll: async (num = 0) => {
			const [rows, fields] = await con.query(`SELECT * FROM Post ORDER BY id DESC LIMIT 10 OFFSET ?`, num);
			return rows;
		},
		
		getByUserId: async (id) => {
			const [rows, fields] = await con.query(`SELECT * FROM Post WHERE userId = ? ORDER BY id DESC`, id);
			return rows;
		},
		
		getByHashtag: async (title) => {
			const [rows, fields] = await con.query(`SELECT Post.id, Post.userNick, Post.userId, Post.img FROM Post inner JOIN PostHashtag ON Post.id = PostHashtag.postId inner join Hashtag on Hashtag.id = PostHashtag.hashtagId WHERE Hashtag.title = ? ORDER BY id DESC`, title);
			return rows;
		},
		
		set: async (userId, userNick, userImg, img) => {
			try{
				const result = await con.query(`INSERT INTO Post(userId, userNick, userImg, img) VALUES (?,?,?,?)`, [userId, userNick, userImg, img]);
				console.log(result);
				return result[0].insertId;
			} catch(err) {
				console.error(err);
				return 0;
			}
		},
		
		update: async (content, img, postId) => {
			try{
				await con.query(`UPDATE Post SET content =?, img = ? WHERE postId = ?`, [content, img, postId]);
			} catch(err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
		
		delete: async (postId) => {
			con.query(`DELETE FROM Post WHERE id = ?`, postId);
		}
	},
	
	Good: {
		getLengthByPostId: async (postId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Good WHERE postId = ?`, postId);
			return rows.length;
		},
		
		getAllByUserId: async (userId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Good WHERE userId = ?`, userId);
			return rows;
		},
		
		getByIds: async (userId, postId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Good WHERE postId = ? AND userId = ?`, [postId, userId]);
			if(rows.length == 0) return 0;
			return 1;
		},
		
		set: async (userId, postId) => {
			try{
				let result = await con.query(`INSERT INTO Good (userId, postId) Values(?, ?)`, [userId, postId]);
				return result.insertId;
			} catch(err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
		
		delete: async (userId, postId) => {
			await con.query(`DELETE FROM Good WHERE userId = ? AND postId = ?`, [userId, postId]);
		}
	},
	
	Comment: {
		getById: async (commentId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Comment WHERE id = ?`, commentId);
			return rows[0];
		},
		
		getAllByPostId: async (postId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Comment WHERE postId = ?`, postId);
			console.log(rows[0]);
			return rows;
		},
		
		set: async (content, postId, userId, userNick, userImg) => {
			try{
				let result = await con.query(`INSERT INTO Comment (content, postId, userId, userNick, userImg) Values (?, ?, ?, ?, ?)`, [content, postId, userId, userNick, userImg]);
				return result[0].insertId;
			} catch(err) {
				console.error(err);
				return 0;
			}
		},
		
		delete: async (commentId) => {
			await con.query(`DELETE FROM Comment WHERE id = ?`, commentId);
		}
	},
	
	Follow: {
		getFollowings: async (userId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Follow WHERE followingId = ?`, userId);
			return rows;
		},
		
		getFollowers: async (userId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Follow WHERE followerId = ?`, userId);
			return rows;
		},
		
		getByIds: async (userId, followerId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Follow WHERE followingId = ? AND followerId = ?`, [userId, followerId]);
			if(rows.length == 0) return 0;
			return 1;
		},
		
		set: async (userId, followerId) => {
			try{
				let result = await con.query(`INSERT INTO Follow (followingId, followerId) VALUES (?, ?)`, [userId, followerId]);
				return result[0].insertId;
			} catch (err) {
				console.error(err);
				return 0;
			}
			return 1;
		},
		
		delete: async (userId, followerId) => {
			await con.query(`DELETE FROM Follow WHERE followingId = ? AND followerId = ?`, [userId, followerId]);
		}
	},
	
	
	Hashtag: {
		
		get: async (title) => {
			const [rows, fields] = await con.query(`SELECT * FROM Hashtag WHERE title = ?`, title)
			return rows[0];
		},
		
		set: async (title) => {
			try{
				let result = await con.query(`INSERT INTO Hashtag (title) VALUES (?)`, title);
				return result[0].insertId;
			} catch(err) {
				console.error(err);
				return 0;
			}
			return 1;
		}
		
	},
	
	Room: {
		getByUserId: async (userId) => {
			const [rows, fields] = await con.query(`SELECT * FROM Room WHERE aId = ? OR bId = ?`, [userId, userId]);
			return rows[0];
		},
		
		set: async (userAId, userBId) => {
			try{
				let result = await con.query(`INSERT INTO Room (aId, bId) VALUES`, [userAId, userBId]);
				return result[0].insertId;
			} catch(err){
				console.error(err);
				return 0;
			}
		}
	},
	
	DM: {
		getByRoomId: async (roomId) => {
			const [rows, fields] = await con.query(`SELECT * FROM DM WHERE roomId = ?`, roomId);
			return rows[0];
		},
		
		set: async (roomId, content, sender) => {
			try{
				let result = await con.query(`INSERT INTO DM (roomId, content, sender) VALUES (?, ?, ?)`, [roomId, content, sender]);
				return result[0].insertId;
			} catch (err){
				console.error(err);
				return 0;
			}
		}
	},
	
	PostHashtag: {
		set: async (postId, hashtagId) => {
			try{
				let result = await con.query(`INSERT INTO PostHashtag (postId, hashtagId) VALUES (? ,?)`, [postId, hashtagId]);
				return result[0].insertId;
			} catch(err) {
				console.error(err);
				return 0;
			}
		},
	},
	/*
	
	Domain: {
		
	},
	
	*/
}

module.exports = items;