const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '52.78.222.253',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '59875',
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