const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '',
		user: '',
		password: '',
		database: '',
		port: '',
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