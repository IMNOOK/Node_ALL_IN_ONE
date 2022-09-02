const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '15.165.136.161',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '57500',
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