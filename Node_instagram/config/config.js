const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '13.209.97.195',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '59356',
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