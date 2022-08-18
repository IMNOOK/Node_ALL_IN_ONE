const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.36.62.103',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '57384',
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