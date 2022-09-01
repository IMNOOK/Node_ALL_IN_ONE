const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '43.200.117.188',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '57920',
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