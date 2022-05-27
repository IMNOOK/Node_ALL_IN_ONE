const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '13.124.169.77',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '51746',
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