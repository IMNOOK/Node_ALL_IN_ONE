const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '13.209.199.136',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '59568',
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