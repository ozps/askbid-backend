const connection = require('../models/dbConnection')

const getAllList = async (req, res) => {
    if (req.body.userID === 0) {
        var fs = require('fs')
        var resultsArray = []
        var allList = []
        const dir = fs.readdirSync('./public/cards/')
        for (const file of dir) {
            let userID = Number(file.substr(9, 1))
            let query = 'SELECT * From User WHERE UserID = ?'
            await new Promise(res => {
                connection.query(query, [userID], (error, results) => {
                    let result = JSON.parse(JSON.stringify(results))
                    const { FullName, Email, Tel, Verified } = result[0]
                    resultsArray.push({
                        userID: userID,
                        fullName: FullName,
                        email: Email,
                        tel: Tel,
                        verified: Verified
                    })
                    res()
                })
            })
            allList.push(Number(file.substr(9, 1)))
        }
        res.status(200).json(resultsArray)
    } else res.status(401).json({ status: 'fail' })
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
