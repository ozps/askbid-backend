const connection = require('../models/dbConnection')
const mailConfig = require('../config/mailConfig')

const checkAdmin = level => {
    return level === 2 ? true : false
}

const getAllCards = (req, res) => {
    if (checkAdmin(req.body.level)) {
        let query = 'SELECT * FROM `user` WHERE card_image IS NOT NULL'
        connection.query(query, (error, results) => {
            if (error) throw error
            result = JSON.parse(JSON.stringify(results))
            res.status(200).json({
                status: 'success',
                result: result
            })
        })
    } else res.status(401).json({ status: 'fail' })
}

const verify = (req, res) => {
    if (checkAdmin(req.body.level)) {
        let query =
            'UPDATE `user` SET level = 1 WHERE id = ?;SELECT full_name, email FROM `user` WHERE id = ?'
        connection.query(
            query,
            [req.body.userId, req.body.userId],
            (error, results) => {
                if (error) throw error
                result = JSON.parse(JSON.stringify(results))
                let sender = mailConfig.mailUser
                let receiver = result[1][0].email
                let mailOptions = {
                    from: sender,
                    to: receiver,
                    subject: 'Update user account level',
                    html: `<p><b>Dear ${
                        result[1][0].full_name
                    }</b></p><p>You are verified user now.</p><p>Let's create ask or bid orders.</p>`
                }
                mailConfig.transporter.sendMail(mailOptions, (error, info) => {
                    if (error) throw error
                    console.log('Mail sent')
                })
                res.status(200).json({ status: 'success' })
            }
        )
    } else res.status(401).json({ status: 'fail' })
}

const ban = (req, res) => {
    if (checkAdmin(req.body.level)) {
        let query =
            'UPDATE `user` SET level = -1 WHERE id = ?;SELECT full_name, email FROM `user` WHERE id = ?'
        connection.query(
            query,
            [req.body.userId, req.body.userId],
            (error, results) => {
                if (error) throw error
                result = JSON.parse(JSON.stringify(results))
                let sender = mailConfig.mailUser
                let receiver = result[1][0].email
                let mailOptions = {
                    from: sender,
                    to: receiver,
                    subject: 'Update user account level',
                    html: `<p><b>Dear ${
                        result[1][0].full_name
                    }</b></p><p>You have been permanently banned.</p><p>Goodbye :)</p>`
                }
                mailConfig.transporter.sendMail(mailOptions, (error, info) => {
                    if (error) throw error
                    console.log('Mail sent')
                })
                res.status(200).json({ status: 'success' })
            }
        )
    } else res.status(401).json({ status: 'fail' })
}

const addItem = (req, res) => {
    if (checkAdmin(req.body.level)) {
        let query =
            'INSERT INTO `item` (brand, `desc`, color, released_date) VALUES (?, ?, ?, ?)'
        connection.query(
            query,
            [
                req.body.brand,
                req.body.desc,
                req.body.color,
                req.body.releasedDate
            ],
            (error, results) => {
                if (error) throw console.log(error)
                res.status(200).json({ status: 'success' })
            }
        )
    } else res.status(401).json({ status: 'fail' })
}

const addImage = (name, id) => {
    let query = 'UPDATE `item` SET image = ? WHERE id = ?'
    connection.query(query, [name, id], (error, results) => {
        if (error) throw error
    })
}

module.exports = {
    checkAdmin,
    getAllCards,
    verify,
    ban,
    addItem,
    addImage
}
