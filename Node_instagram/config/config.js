const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.38.214.84',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '57188',
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