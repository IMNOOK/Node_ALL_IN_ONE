const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const chatSchema = new Schema({
	room: {
		type: ObjectId,
		required: true,
		ref: 'Room',
	},
	userId: {
		type: Number,
		required: true,
	},
	userNick: {
		type: String,
		required: true,
	},
	userImg:{
		type: String,
		required: true,
		
	},
	chat: String,
	gif: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Chat', chatSchema);