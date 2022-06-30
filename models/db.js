const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.MYSQL_HOST || 'db',
  port: 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
});

module.exports = db;