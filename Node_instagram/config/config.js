const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '15.165.121.20',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '55551',
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