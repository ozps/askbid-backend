const connection = require('../models/dbConnection')
const mailConfig = require('../config/mailConfig')

const checkBan = level => {
    return level === -1 ? true : false
}

const processMatch = (userId, orderId, insertPrice, bestPrice) => {
    let query =
        'UPDATE `user` SET balance = balance - ? WHERE id = ?;UPDATE `user` SET balance = balance + ? WHERE level = 2;UPDATE `order` SET available = 0 WHERE id = ?;INSERT INTO `match` (user_id, order_id, insert_price, best_price, paid_date, stamp_date) VALUES (?, ?, ?, ?, ?, ?)'
    let date = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
    connection.query(
        query,
        [
            bestPrice,
            userId,
            bestPrice,
            orderId,
            userId,
            orderId,
            insertPrice,
            bestPrice,
            date,
            date
        ],
        (error, results) => {
            if (error) throw error
        }
    )
}

const mailMatch = (ownerId, customerId) => {
    let query =
        'SELECT * FROM `user` WHERE id = ?;SELECT * FROM `user` WHERE id = ?'
    connection.query(query, [ownerId, customerId], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        let sender = mailConfig.mailUser
        let receiver = result[0][0].email
        let mailOptions = {
            from: sender,
            to: receiver,
            subject: 'AskBid Matched Order',
            html: `<p><b>Dear ${
                result[0][0].full_name
            }</b></p><p>Your order was matched by ${
                result[1][0].full_name
            }.</p>`
        }
        mailConfig.transporter.sendMail(mailOptions, (error, info) => {
            if (error) throw error
            console.log('Mail sent')
        })
    })
}

const processReceived = (netPrice, ownerId) => {
    let query =
        'UPDATE `user` SET balance = balance + ? WHERE id = ?;UPDATE `user` SET balance = balance - ? WHERE level = 2'
    connection.query(query, [netPrice, ownerId, netPrice], (error, results) => {
        if (error) throw error
    })
}

const mailClosed = (ownerId, netPrice) => {
    let query = 'SELECT * FROM `user` WHERE id = ?'
    connection.query(query, [ownerId], (error, results) => {
        if (error) throw error
        result = JSON.parse(JSON.stringify(results))
        let sender = mailConfig.mailUser
        let receiver = result[0].email
        let mailOptions = {
            from: sender,
            to: receiver,
            subject: 'AskBid Closed Match',
            html: `<p><b>Dear ${
                result[0].full_name
            }</b></p><p>You have received ${netPrice} Baht.</p>`
        }
        mailConfig.transporter.sendMail(mailOptions, (error, info) => {
            if (error) throw error
            console.log('Mail sent')
        })
    })
}

const placeOrder = (req, res) => {
    if (!checkBan(req.body.level)) {
        if (req.body.flag === 0) {
            // Ask
            let query =
                'SELECT * FROM `order` WHERE flag = 0 AND available = 1 AND item_id = ? AND size = ? AND price <= ? ORDER BY price ASC, published_date ASC LIMIT 1;SELECT balance FROM `user` WHERE id = ?'
            connection.query(
                query,
                [
                    req.body.itemId,
                    req.body.size,
                    req.body.price,
                    req.body.userId // Customer
                ],
                (error, results) => {
                    if (error) throw error
                    result = JSON.parse(JSON.stringify(results))
                    if (
                        result[0][0].length !== 0 &&
                        result[1][0].balance >= result[0][0].price
                    ) {
                        processMatch(
                            req.body.userId,
                            result[0][0].id,
                            req.body.price,
                            result[0][0].price
                        )
                        mailMatch(result[0][0].user_id, req.body.userId)
                        res.status(200).json({ status: 'success' })
                    } else {
                        res.status(400).json({ status: 'fail' })
                    }
                }
            )
        } else {
            //Bid
            let query =
                'SELECT * FROM `order` WHERE flag = 1 AND available = 1 AND item_id = ? AND size = ? AND price >= ? ORDER BY price DESC, published_date ASC LIMIT 1;SELECT balance FROM `user` WHERE id = ?'
            connection.query(
                query,
                [
                    req.body.itemId,
                    req.body.size,
                    req.body.price,
                    req.body.userId // Customer
                ],
                (error, results) => {
                    if (error) throw error
                    result = JSON.parse(JSON.stringify(results))
                    if (
                        result[0][0].length !== 0 &&
                        result[1][0].balance >= result[0][0].price
                    ) {
                        processMatch(
                            req.body.userId,
                            result[0][0].id,
                            req.body.price,
                            result[0][0].price
                        )
                        mailMatch(result[0][0].user_id, req.body.userId)
                        res.status(200).json({ status: 'success' })
                    } else {
                        res.status(400).json({ status: 'fail' })
                    }
                }
            )
        }
    } else res.status(401).json({ status: 'fail' })
}

const getUserMatch = (req, res) => {
    if (!checkBan(req.body.level)) {
        let query =
            'SELECT * FROM `match` INNER JOIN `order` ON match.order_id = order.id INNER JOIN `item` ON order.item_id = item.id WHERE match.user_id = ?'
        connection.query(query, [req.body.userId], (error, results) => {
            if (error) throw error
            result = JSON.parse(JSON.stringify(results))
            result = result.sort((a, b) => (a.paid_date < b.paid_date ? 1 : -1))
            output = []
            for (x of result) {
                let temp = {}
                temp.id = x.id
                temp.user_id = x.user_id
                temp.order_id = x.order_id
                temp.price = x.best_price
                temp.paid_date = x.paid_date
                temp.item = x.brand + ' ' + x.desc + ' ' + x.color
                output.push(temp)
            }
            res.status(200).json({ status: 'success', result: output })
        })
    } else res.status(401).json({ status: 'fail' })
}

const getPendingMatch = (req, res) => {
    if (!checkBan(req.body.level)) {
        let query =
            'SELECT * FROM `match` INNER JOIN `order` ON match.order_id = order.id INNER JOIN `item` ON order.item_id = item.id WHERE match.user_id = ? AND match.shipping_status <> 2'
        connection.query(query, [req.body.userId], (error, results) => {
            if (error) throw error
            result = JSON.parse(JSON.stringify(results))
            result = result.sort((a, b) => (a.paid_date < b.paid_date ? 1 : -1))
            output = []
            for (x of result) {
                let temp = {}
                temp.id = x.id
                temp.user_id = x.user_id
                temp.order_id = x.order_id
                temp.price = x.best_price
                temp.paid_date = x.paid_date
                temp.item = x.brand + ' ' + x.desc + ' ' + x.color
                output.push(temp)
            }
            res.status(200).json({ status: 'success', result: output })
        })
    } else res.status(401).json({ status: 'fail' })
}

const getBill = (req, res) => {
    if (!checkBan(req.body.level)) {
        let query =
            'SELECT * FROM `match` INNER JOIN `order` ON match.order_id = order.id INNER JOIN `item` ON order.item_id = item.id WHERE match.id = ? AND match.user_id = ?'
        connection.query(
            query,
            [req.body.matchId, req.body.userId],
            (error, results) => {
                if (error) throw error
                result = JSON.parse(JSON.stringify(results))
                output = []
                for (x of result) {
                    let temp = {}
                    temp.id = x.id
                    temp.user_id = x.user_id
                    temp.order_id = x.order_id
                    temp.price = x.best_price
                    temp.paid_date = x.paid_date
                    temp.item = x.brand + ' ' + x.desc + ' ' + x.color
                    output.push(temp)
                }
                res.status(200).json({ status: 'success', result: output })
            }
        )
    } else res.status(401).json({ status: 'fail' })
}

const updateShipping = (req, res) => {
    if (!checkBan(req.body.level)) {
        let query =
            'UPDATE `match` SET shipping_status = ? WHERE id = ? AND user_id = ?;SELECT * FROM `match` INNER JOIN `order` ON match.order_id = order.id INNER JOIN `user` ON order.user_id = user.id WHERE match.id = ? AND match.user_id = ?'
        connection.query(
            query,
            [
                req.body.shippingStatus,
                req.body.matchId,
                req.body.userId,
                req.body.matchId,
                req.body.userId
            ],
            (error, results) => {
                if (error) throw error
                if (req.body.shippingStatus === 2) {
                    result = JSON.parse(JSON.stringify(results))
                    let netPrice = result[1][0].best_price * 0.97
                    processReceived(netPrice, result[1][0].user_id)
                    mailClosed(result[1][0].user_id, netPrice)
                }
                res.status(200).json({ status: 'success' })
            }
        )
    } else res.status(401).json({ status: 'fail' })
}

module.exports = {
    placeOrder,
    getUserMatch,
    getPendingMatch,
    getBill,
    updateShipping
}
