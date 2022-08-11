const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '3.39.5.152',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '54537',
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