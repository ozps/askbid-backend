const db = require('../config/dbConfig')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database
})

connection.connect(function(err) {
    if (err) throw err
    console.log('Connected!')
})

module.exports = connection
