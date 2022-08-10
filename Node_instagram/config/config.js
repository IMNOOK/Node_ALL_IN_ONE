const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.38.152.215',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '58866',
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