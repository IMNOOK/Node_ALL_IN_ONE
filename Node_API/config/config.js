const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.34.40.210',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '51358',
	},
	test:{
		host: '',
		user: '',
		password: '',
		database: '',
		port: '',
	},
};

module.exports = config;