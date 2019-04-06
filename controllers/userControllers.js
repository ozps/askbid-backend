const connection = require('../models/dbConnection')
const keys = require('../config/keys')
const mailConfig = require('../config/mailConfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('email-validator')
const saltRounds = 10

const register = (fullName, cardNo, email, password) => {
    bcrypt.genSalt(saltRounds, function(error, salt) {
        bcrypt.hash(password, salt, function(error, hash) {
            let query =
                'INSERT INTO `user` (full_name, card_no, email, password) VALUES (?, ?, ?, ?)'
            connection.query(
                query,
                [fullName, cardNo, email, hash],
                (error, results) => {
                    if (error) throw error
                }
            )
        })
    })
}

const signUp = (req, res) => {
    if (validator.validate(req.body.email) && req.body.cardNo.length === 13) {
        let query = 'SELECT * FROM `user` WHERE email = ? OR card_no = ?'
        connection.query(
            query,
            [req.body.email, req.body.cardNo],
            (error, results) => {
                if (error) throw error
                result = JSON.parse(JSON.stringify(results))
                if (result.length === 0) {
                    register(
                        req.body.fullName,
                        req.body.cardNo,
                        req.body.email,
                        req.body.password
                    )
                    let sender = mailConfig.mailUser
                    let receiver = req.body.email
                    let mailOptions = {
                        from: sender,
                        to: receiver,
                        subject: 'AskBid Registration',
                        html: `<p><b>Dear ${
                            req.body.fullName
                        }</b></p><p>Your registration was successful.</p><p>Welcome :)</p>`
                    }
                    mailConfig.transporter.sendMail(
                        mailOptions,
                        (error, info) => {
                            if (error) throw error
                            console.log('Mail sent')
                        }
                    )
                    res.status(200).json({ status: 'success' })
                } else {
                    res.status(409).json({ status: 'fail' })
                }
            }
        )
    } else res.status(409).json({ status: 'fail' })
}

const signIn = (req, res) => {
    if (validator.validate(req.body.email)) {
        let query = 'SELECT * FROM `user` WHERE email = ?'
        let checkPass = false
        connection.query(query, [req.body.email], (error, results) => {
            if (error) throw error
            result = JSON.parse(JSON.stringify(results))
            if (result.length > 0) {
                password = result[0].password
                checkPass = bcrypt.compareSync(req.body.password, password)
            }
            if (checkPass) {
                let token = jwt.sign({ data: req.body.email }, keys.secretKey, {
                    expiresIn: 60 * 60
                })
                res.status(200).json({
                    status: 'success',
                    token: token,
                    userId: result[0].id,
                    level: result[0].level
                })
            } else {
                res.status(401).json({ status: 'fail' })
            }
        })
    } else res.status(401).json({ status: 'fail' })
}

const getProfile = (req, res) => {
    let query = 'SELECT * FROM `user` WHERE id = ?'
    connection.query(query, [req.body.userId], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        if (result.length !== 0)
            res.status(200).json({
                status: 'success',
                result: result[0]
            })
        else res.status(403).json({ status: 'fail' })
    })
}

const updateProfile = (req, res) => {
    let query =
        'UPDATE `user` SET full_name = ?, address = ?, tel_no = ?, balance = ?, bank_no = ? WHERE id = ?'
    connection.query(
        query,
        [
            req.body.fullName,
            req.body.address,
            req.body.telNo,
            req.body.balance,
            req.body.bankNo,
            req.body.userId
        ],
        (error, results) => {
            if (error) throw error
            res.status(200).json({ status: 'success' })
        }
    )
}

const addAvatar = (name, id) => {
    let query = 'UPDATE `user` SET avatar_image = ? WHERE id = ?'
    connection.query(query, [name, id], (error, results) => {
        if (error) throw error
    })
}

const addCard = (name, id) => {
    let query = 'UPDATE `user` SET card_image = ? WHERE id = ?'
    connection.query(query, [name, id], (error, results) => {
        if (error) throw error
    })
}

module.exports = {
    signUp,
    signIn,
    getProfile,
    updateProfile,
    addAvatar,
    addCard
}
