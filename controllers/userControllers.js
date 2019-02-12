const connection = require('../models/dbConnection')
const keys = require('../config/keys')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('email-validator')
const saltRounds = 10

const register = (fullName, email, password) => {
    bcrypt.genSalt(saltRounds, function(error, salt) {
        bcrypt.hash(password, salt, function(error, hash) {
            let query =
                'INSERT INTO User (FullName, Email, Password, Verified, Salt) VALUES (?, ?, ?, false, ?)'
            connection.query(
                query,
                [fullName, email, hash, salt],
                (error, results) => {
                    if (error) throw error
                }
            )
        })
    })
}

const signUp = (req, res) => {
    if (validator.validate(req.body.email)) {
        let queryEmail = 'SELECT * FROM User WHERE Email = ?'
        connection.query(queryEmail, [req.body.email], (error, results) => {
            if (error) throw error
            result = JSON.parse(JSON.stringify(results))
            if (result.length == 0) {
                register(req.body.fullName, req.body.email, req.body.password)
                res.status(200).json({ status: 'success' })
            } else {
                res.status(409).json({ status: 'fail' })
            }
        })
    } else res.status(409).json({ status: 'fail' })
}

const signIn = (req, res) => {
    if (validator.validate(req.body.email)) {
        let query = 'SELECT * FROM User WHERE Email = ?'
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
                    userID: result[0].UserID,
                    verified: result[0].Verified
                })
            } else {
                res.status(401).json({ status: 'fail' })
            }
        })
    } else res.status(401).json({ status: 'fail' })
}

const updateProfile = (req, res) => {
    let query =
        'UPDATE User SET FullName = ?, Address = ?, Tel = ?, Balance = ?, BankNo = ? WHERE UserID = ?'
    connection.query(
        query,
        [
            req.body.fullName,
            req.body.address,
            req.body.tel,
            req.body.balance,
            req.body.bankNo,
            req.body.userID
        ],
        (error, results) => {
            if (error) throw error
            res.status(200).json({ status: 'success' })
        }
    )
}

const getDetailUser = (req, res) => {
    let query =
        'SELECT FullName, Address, Tel, Balance, BankNo FROM User WHERE UserID = ?'
    connection.query(query, [req.body.userID], (error, results) => {
        if (error) throw error
        queryResults = JSON.parse(JSON.stringify(results))
        res.status(200).json(queryResults[0])
    })
}

module.exports = {
    signUp,
    signIn,
    updateProfile,
    getDetailUser
}
