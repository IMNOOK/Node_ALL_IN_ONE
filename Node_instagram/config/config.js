const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '15.164.162.188',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '50208',
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