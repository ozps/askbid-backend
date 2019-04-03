const connection = require('../models/dbConnection')

const checkBan = level => {
    return level === -1 ? true : false
}

const placeOrder = (req, res) => {
    if (!checkBan(req.body.level)) {
    } else res.status(401).json({ status: 'fail' })
}

const getUserMatch = (req, res) => {
    if (!checkBan(req.body.level)) {
        let query = 'SELECT * FROM `match` WHERE user_id = ?'
        connection.query(query, [req.body.userId], (error, results) => {
            if (error) throw error
            result = JSON.parse(JSON.stringify(results))
            result = result.sort((a, b) => (a.paid_date < b.paid_date ? 1 : -1))
            res.status(200).json(result)
        })
    } else res.status(401).json({ status: 'fail' })
}

const getBill = (req, res) => {
    if (!checkBan(req.body.level)) {
        let query = 'SELECT * FROM `match` WHERE id = ? AND user_id = ?'
        connection.query(
            query,
            [req.body.matchId, req.body.userId],
            (error, results) => {
                if (error) throw error
                result = JSON.parse(JSON.stringify(results))
                res.status(200).json(result)
            }
        )
    } else res.status(401).json({ status: 'fail' })
}

const updateShipping = (req, res) => {}

module.exports = {
    placeOrder,
    getUserMatch,
    getBill,
    updateShipping
}
