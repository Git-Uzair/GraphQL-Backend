// 'use strict'

// const config = require('./../config')
// const mysql = require('mysql')

// const connection = mysql.createConnection({
//     host: config.SQL.host,
//     user: config.SQL.user,
//     password: config.SQL.password,
//     database: config.SQL.database
// })

// const connect = () => {
//     connection.connect(err => {
//         if(err) {
//             console.log("Error: Cannot connect to DB!")
//             console.log(err);
//             return err;
//         } else {
//             console.log("Db connection successful!")
//             return true;
//         }
//     })
// }

// module.exports = { connection, connect }