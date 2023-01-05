const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: 'localhost',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '3306',
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