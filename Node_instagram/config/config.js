const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '43.200.177.61',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '56309',
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