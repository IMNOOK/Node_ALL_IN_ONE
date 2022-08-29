const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '54.180.97.1',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '55367',
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