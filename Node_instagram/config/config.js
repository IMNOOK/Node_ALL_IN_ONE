const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: '13.209.81.87',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '56963',
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