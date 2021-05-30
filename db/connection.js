const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1=Brown+Soda',
        database: 'workforce'
    },
);

module.exports = db;