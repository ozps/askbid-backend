const connection = require('../models/dbConnection')

const createOrder = (req, res) => {
    let checkVerified = 'SELECT Verified FROM User WHERE UserID = ?'
    connection.query(checkVerified, [req.body.userID], (error, results) => {
        if (error) throw error
        let resultVerified = JSON.parse(JSON.stringify(results))
        if (resultVerified[0].Verified > 0) {
            let query =
                'INSERT INTO `Order` (UserID, ItemID, ItemSize, OrderAmount, OrderPrice, FlagAB) VALUES (?, ?, ?, ?, ?, ?)'
            connection.query(
                query,
                [
                    req.body.userID,
                    req.body.itemID,
                    req.body.itemSize,
                    req.body.orderAmount,
                    req.body.orderPrice,
                    req.body.flagAB
                ],
                (err, rows) => {
                    if (err) throw err
                    res.status(200).json({ status: 'success' })
                }
            )
        } else res.status(401).json({ status: 'fail' })
    })
}

const getUserOrders = (req, res) => {
    let query = 'SELECT OrderID FROM User NATURAL JOIN `Order` WHERE UserID = ?'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        queryResults = JSON.parse(JSON.stringify(results))
        res.status(200).json(queryResults)
    })
}

const getItemOrders = (req, res) => {
    let query = 'SELECT OrderID FROM Item NATURAL JOIN `Order` WHERE ItemID = ?'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        queryResults = JSON.parse(JSON.stringify(results))
        res.status(200).json(queryResults)
    })
}

const getDetailOrder = (req, res) => {
    let query = 'SELECT * FROM `Order` WHERE OrderID = ?'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        queryResults = JSON.parse(JSON.stringify(results))
        res.status(200).json(queryResults[0])
    })
}

const getAskPrice = (req, res) => {
    let query =
        'SELECT OrderPrice FROM Item NATURAL JOIN `Order` WHERE FlagAB = 0'
    connection.query(query, [req.params.id], (error, results) => {
        let resultsArray = JSON.parse(JSON.stringify(results))
        resultsArray = resultsArray.sort((a, b) =>
            a.OrderPrice > b.OrderPrice ? 1 : -1
        )
        res.status(200).json(resultsArray)
    })
}

const getBidPrice = (req, res) => {
    let query =
        'SELECT OrderPrice FROM Item NATURAL JOIN `Order` WHERE FlagAB = 1'
    connection.query(query, [req.params.id], (error, results) => {
        let resultsArray = JSON.parse(JSON.stringify(results))
        resultsArray = resultsArray.sort((a, b) =>
            a.OrderPrice < b.OrderPrice ? 1 : -1
        )
        res.status(200).json(resultsArray)
    })
}

const updateOrder = (req, res) => {
    let query =
        'UPDATE `Order` SET ItemSize = ?, OrderAmount = ?, OrderPrice = ?, FlagAB = ? WHERE OrderID = ? AND UserID = ?'
    connection.query(
        query,
        [
            req.body.itemSize,
            req.body.orderAmount,
            req.body.orderPrice,
            req.body.flagAB,
            req.body.orderID,
            req.body.userID
        ],
        (error, results) => {
            if (error) throw error
            res.status(200).json({ status: 'success' })
        }
    )
}

const deleteOrder = (req, res) => {
    let query = 'DELETE FROM `Order` WHERE OrderID = ? AND UserID = ?'
    connection.query(
        query,
        [req.body.orderID, req.body.userID],
        (error, results) => {
            if (error) throw error
            res.status(200).json({ status: 'success' })
        }
    )
}

module.exports = {
    createOrder,
    getUserOrders,
    getItemOrders,
    getDetailOrder,
    getAskPrice,
    getBidPrice,
    updateOrder,
    deleteOrder
}
