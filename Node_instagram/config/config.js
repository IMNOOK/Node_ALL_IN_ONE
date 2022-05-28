const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.39.24.154',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '55457',
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