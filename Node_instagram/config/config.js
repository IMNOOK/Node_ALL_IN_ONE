const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '13.124.174.96',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '55498',
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