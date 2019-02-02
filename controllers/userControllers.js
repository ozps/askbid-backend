const connection = require('../models/dbConnection')
const keys = require('../config/keys')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10

const signUp = (req, res) => {
    bcrypt.genSalt(saltRounds, function(error, salt) {
        bcrypt.hash(req.body.password, salt, function(error, hash) {
            let query =
                'INSERT INTO User(FullName, Email, Password, Verified, Salt) VALUES(?,?,?,false,?)'
            connection.query(
                query,
                [req.body.fullName, req.body.email, hash, salt],
                (error, results) => {
                    if (error) throw error
                    res.status(200).json({ status: 'success' })
                }
            )
        })
    })
}

const signIn = (req, res) => {
    let query = 'SELECT UserID,Password FROM User WHERE Email = ?'
    let checkPass = false
    connection.query(query, [req.body.email], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        if (result.length > 0) {
            password = result[0].Password
            checkPass = bcrypt.compareSync(req.body.password, password)
        }
        if (checkPass) {
            let token = jwt.sign({ data: req.body.email }, keys.secretKey, {
                expiresIn: 60 * 60
            })
            res.status(200).json({
                status: 'success',
                token: token,
                userID: result[0].UserID
            })
        } else {
            res.status(200).json({ status: 'fail' })
        }
    })
}

const updateProfile = (req, res) => {}

const forgetPassword = (req, res) => {}

const changePassword = (req, res) => {}

const verifyUser = (req, res) => {}

module.exports = {
    signUp,
    signIn,
    updateProfile,
    forgetPassword,
    changePassword,
    verifyUser
}
