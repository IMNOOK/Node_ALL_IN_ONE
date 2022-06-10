const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '52.78.128.76',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '51263',
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