const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '43.200.44.175',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '51332',
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