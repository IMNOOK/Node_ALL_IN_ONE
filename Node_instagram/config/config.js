const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.35.13.214',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '51366',
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