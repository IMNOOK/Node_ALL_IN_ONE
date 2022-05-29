const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.39.11.210',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '53868',
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