const connection = require('../models/dbConnection')

const checkVerified = level => {
    return level > 0 ? true : false
}

const createOrder = (req, res) => {
    if (checkVerified(req.body.level)) {
        let query =
            'INSERT INTO `order` (user_id, item_id, size, price, flag, published_date) VALUES (?, ?, ?, ?, ?, ?)'
        connection.query(
            query,
            [
                req.body.userId,
                req.body.itemId,
                req.body.size,
                req.body.price,
                req.body.flag,
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
        result = result.sort((a, b) =>
            a.published_date < b.published_date ? 1 : -1
        )
        res.status(200).json({ status: 'success', result: result })
    })
}

const getUserOrders = (req, res) => {
    let query = 'SELECT * FROM `order` WHERE user_id = ?'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        result = result.sort((a, b) =>
            a.published_date < b.published_date ? 1 : -1
        )
        res.status(200).json({ status: 'success', result: result })
    })
}

const getItemOrders = (req, res) => {
    let query = 'SELECT * FROM `order` WHERE item_id = ?'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        result = result.sort((a, b) =>
            a.published_date < b.published_date ? 1 : -1
        )
        res.status(200).json({ status: 'success', result: result })
    })
}

const getOrder = (req, res) => {
    let query = 'SELECT * FROM `order` WHERE id = ?'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        res.status(200).json({ status: 'success', result: result })
    })
}

const updateOrder = (req, res) => {
    if (checkVerified(req.body.level)) {
        let query =
            'UPDATE `order` SET size = ?, price = ?, flag = ?, published_date = ? WHERE id = ? AND user_id = ?'
        connection.query(
            query,
            [
                req.body.size,
                req.body.price,
                req.body.flag,
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

const outOfStock = (req, res) => {
    if (checkVerified(req.body.level)) {
        let query =
            'UPDATE `order` SET available = 0 WHERE id = ? AND user_id = ?'
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

const getAskPrice = (req, res) => {
    let query = 'SELECT * FROM `order` WHERE item_id = ? AND flag = 0'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        result = result.sort((a, b) => (a.price > b.price ? 1 : -1))
        res.status(200).json({ status: 'success', result: result })
    })
}

const getBidPrice = (req, res) => {
    let query = 'SELECT * FROM `order` WHERE item_id = ? AND flag = 1'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        result = result.sort((a, b) => (a.price < b.price ? 1 : -1))
        res.status(200).json({ status: 'success', result: result })
    })
}

module.exports = {
    createOrder,
    getAllOrders,
    getUserOrders,
    getItemOrders,
    getOrder,
    updateOrder,
    outOfStock,
    deleteOrder,
    getAskPrice,
    getBidPrice
}
