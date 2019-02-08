const connection = require('../models/dbConnection')
const async = require('async')

const getAllList = (req, res) => {
    var fs = require('fs')
    var resultsArray = []
    var allList = []
    fs.readdirSync('./public/uploads/').forEach(file => {
        // let userID = Number(file.substr(9, 1))
        // let query = 'SELECT Verified From User WHERE UserID = ?'
        // connection.query(query, [userID], (error, results) => {
        //     let result = JSON.parse(JSON.stringify(results))
        //     resultsArray.push({ userID: userID, verified: result[0].Verified })
        //     console.log('In')
        // })
        allList.push(Number(file.substr(9, 1)))
    })
    // res.status(200).json(resultsArray)
    async.forEachOf(
        allList,
        function(dataElement, i, inner_callback) {
            let query = 'SELECT Verified From User WHERE UserID = ?'
            connection.query(query, [dataElement], (error, results) => {
                if (error) {
                    inner_callback(error)
                } else {
                    let result = JSON.parse(JSON.stringify(results))
                    resultsArray.push({
                        userID: dataElement,
                        verified: result[0].Verified
                    })
                    inner_callback(null)
                }
            })
        },
        err => {
            if (err) throw err
            else res.status(200).json(resultsArray)
        }
    )
}

const verify = (req, res) => {
    let queryCheck = 'SELECT Verified FROM User WHERE UserID = ?'
    connection.query(queryCheck, [req.body.userID], (error, results) => {
        if (error) throw error
        else {
            result = JSON.parse(JSON.stringify(results))
            if (result[0].Verified == 2) {
                let query = 'UPDATE User SET Verified = ? WHERE UserID = ?'
                connection.query(
                    query,
                    [req.body.verified, req.body.targetID],
                    (err, result) => {
                        if (error) throw error
                        res.status(200).json({ status: 'success' })
                    }
                )
            } else res.status(401).json({ status: 'fail' })
        }
    })
}

module.exports = {
    getAllList,
    verify
}
