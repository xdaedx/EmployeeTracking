const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, 
    user: 'root', 
    password: 'Gates7dSme!i90', 
    database: 'tracker_db',
}); 

connection.connect(err => {
    if (err) throw err; 
    console.log('\nConnected as id ' + connection.threadId); 
}); 

module.exports = connection; 