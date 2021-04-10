const mysql = require('mysql');

// Fill in sql host and password later
const connection = mysql.createconnection({
}); 

connection.connect(err => {
    if (err) throw err; 
    console.log('\nConnected as id ' + connection.threadId); 
}); 