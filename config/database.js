mysqlConfig = {
    connectionLimit : 100, 
    host     : '127.0.0.1',
    user: "sa",
    password: "123456",
    port     : 3306,
    database : 'xcaliber',
    charset  : 'utf8'
};

// mySQL pool
let mysql = require('mysql2/promise');
let mysqlPool = mysql.createPool(mysqlConfig);

exports.mysqlPool = mysqlPool;
