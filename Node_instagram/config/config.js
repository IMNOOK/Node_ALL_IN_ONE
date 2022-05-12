const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.35.233.52',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '52748',
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