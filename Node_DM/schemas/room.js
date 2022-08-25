const mongoose = require('mongoose');

const { Schema } = mongoose;
const roomSchema = new Schema({
	aId: {
		type: Number,
		required: true,
	},
	bId: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	LastAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Room', roomSchema);