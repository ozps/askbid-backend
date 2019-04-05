const connection = require('../models/dbConnection')

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
        let query = 'UPDATE `user` SET level = 1 WHERE id = ?'
        connection.query(query, [req.body.userId], (error, results) => {
            if (error) throw error
            res.status(200).json({ status: 'success' })
        })
    } else res.status(401).json({ status: 'fail' })
}

const ban = (req, res) => {
    if (checkAdmin(req.body.level)) {
        let query = 'UPDATE `user` SET level = -1 WHERE id = ?'
        connection.query(query, [req.body.userId], (error, results) => {
            if (error) throw error
            res.status(200).json({ status: 'success' })
        })
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
