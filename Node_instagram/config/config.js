const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '52.79.234.107',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '54855',
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