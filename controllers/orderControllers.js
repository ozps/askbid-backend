const connection = require('../models/dbConnection')

const checkVerified = level => {
    return level > 0 ? true : false
}

const createOrder = (req, res) => {
    if (checkVerified(req.body.level)) {
        let query =
            'INSERT INTO `order` (user_id, item_id, size, price, type, published_date) VALUES (?, ?, ?, ?, ?, ?)'
        connection.query(
            query,
            [
                req.body.userId,
                req.body.itemId,
                req.body.size,
                req.body.price,
                req.body.type,
                new Date()
                    .toISOString()
                    .replace(/T/, ' ')
                    .replace(/\..+/, '')
            ],
            (error, results) => {
                if (error) throw error
                res.status(200).json({ status: 'success' })
            }
        )
    } else res.status(401).json({ status: 'fail' })
}

const getAllOrders = (req, res) => {
    let query = 'SELECT * FROM `order`'
    connection.query(query, (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        res.status(200).json(result[0])
    })
}

const getUserOrders = (req, res) => {
    let query = 'SELECT * FROM `order` WHERE user_id = ?'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        res.status(200).json(result[0])
    })
}

const getItemOrders = (req, res) => {
    let query = 'SELECT * FROM `order` WHERE item_id = ?'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        res.status(200).json(result[0])
    })
}

const getOrder = (req, res) => {
    let query = 'SELECT * FROM `order` WHERE id = ?'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        res.status(200).json(result[0])
    })
}

const updateOrder = (req, res) => {
    if (checkVerified(req.body.level)) {
        let query =
            'UPDATE `order` SET size = ?, price = ?, type = ?, published_date = ?  WHERE id = ? AND user_id = ?'
        connection.query(
            query,
            [
                req.body.size,
                req.body.price,
                req.body.type,
                new Date()
                    .toISOString()
                    .replace(/T/, ' ')
                    .replace(/\..+/, ''),
                req.body.orderId,
                req.body.userId
            ],
            (error, results) => {
                if (error) throw error
                res.status(200).json({ status: 'success' })
            }
        )
    } else res.status(401).json({ status: 'fail' })
}

const deleteOrder = (req, res) => {
    if (checkVerified(req.body.level)) {
        let query = 'DELETE FROM `order` WHERE id = ? AND user_id = ?'
        connection.query(
            query,
            [req.body.orderId, req.body.userId],
            (error, results) => {
                if (error) throw error
                res.status(200).json({ status: 'success' })
            }
        )
    } else res.status(401).json({ status: 'fail' })
}

module.exports = {
    createOrder,
    getAllOrders,
    getUserOrders,
    getItemOrders,
    getOrder,
    updateOrder,
    deleteOrder
}
