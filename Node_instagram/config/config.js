const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.39.190.41',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '53493',
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