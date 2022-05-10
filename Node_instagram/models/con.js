const mysql = require('mysql');
const dotenv = require('dotenv');
const config = require('../config/config');

donenv.config();

const con = mysql.createConnection(
	config[process.env.NODE_ENV || 'development']
);

con.connect((err) => {
	if(err) throw err;
});

module.exports = con;