const mysql = require('mysql2');
const env = require('dotenv').config();
//database connection
const conn = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
    //sql password here
      password: process.env.DB_PASSWORD,
      database: 'employee_db'
    },
  );
    conn.connect(function(err) {  
        if (err) throw err;  
        //console.log(`Connected to the employee_db database. \n`)
    });

module.exports = conn;