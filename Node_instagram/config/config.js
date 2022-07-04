const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.34.99.223',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '54979',
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