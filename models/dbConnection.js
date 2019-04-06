const db = require('../config/dbConfig')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database,
    multipleStatements: true
})

connection.connect(error => {
    if (error) throw error
    console.log('Connected!')
})

module.exports = connection
