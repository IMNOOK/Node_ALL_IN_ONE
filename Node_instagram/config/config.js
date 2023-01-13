const dotenv = require('dotenv');

dotenv.config();

const config = {
	development:{
		host: 'localhost',
		user: 'IMNOOK',
		password: 'dhksthxpa12',
		database: 'nodeInstagram',
		port: '3306',
	},
	test:{
		host: '',
		user: '',
		password: '',
		database: '',
		port: '',
	},
	production: {
		host: '192.168.219.111',
		user: 'IMNOOK',
		password: process.env.MYSQL_PASSWORD,
		database: 'node',
		port: '3306',
	},
};

module.exports = config;