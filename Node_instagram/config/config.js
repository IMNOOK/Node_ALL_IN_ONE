const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '15.165.205.177',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '53227',
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