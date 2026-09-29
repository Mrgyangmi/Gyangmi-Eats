require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// Test MySQL connection
db.getConnection((err, connection) => {
  if (err) {
    console.log("Database connection failed:", err);
    return;
  }

  console.log("MySQL connected!");
  connection.release();
});

module.exports = db;