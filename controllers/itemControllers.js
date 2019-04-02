const connection = require('../models/dbConnection')

const getAllItems = (req, res) => {
    let query = 'SELECT * FROM `item`'
    connection.query(query, (error, results) => {
        if (error) throw error
        let result = JSON.parse(JSON.stringify(results))
        result = result.sort((a, b) =>
            a.brand + ' ' + a.desc > b.brand + ' ' + b.desc ? 1 : -1
        )
        res.status(200).json({ status: 'success', result: result })
    })
}

const getNewItems = (req, res) => {
    let query = 'SELECT * FROM `item`'
    connection.query(query, (error, results) => {
        if (error) throw error
        let result = JSON.parse(JSON.stringify(results))
        result = result.sort((a, b) =>
            a.released_date < b.released_date ? 1 : -1
        )
        res.status(200).json({ status: 'success', result: result })
    })
}

const getPopularItems = (req, res) => {
    let query = 'SELECT * FROM `item`'
    connection.query(query, (error, results) => {
        if (error) throw error
        let result = JSON.parse(JSON.stringify(results))
        result = result.sort((a, b) =>
            a.visited_count < b.visited_count ? 1 : -1
        )
        res.status(200).json({ status: 'success', result: result })
    })
}

const getItem = (req, res) => {
    let query =
        'UPDATE `item` SET visited_count = visited_count + 1 WHERE id = ?;SELECT * FROM `item` WHERE id = ?'
    connection.query(
        query,
        [req.params.id, req.params.id],
        (error, results) => {
            if (error) throw error
            result = JSON.parse(JSON.stringify(results))
            res.status(200).json({ status: 'success', result: result[1] })
        }
    )
}

const searchItems = (req, res) => {
    let query =
        'SELECT * FROM `item` WHERE brand LIKE "%"?"%" OR `desc` LIKE "%"?"%" OR color LIKE "%"?"%"'
    connection.query(
        query,
        [req.body.detail, req.body.detail, req.body.detail],
        (error, results) => {
            if (error) throw error
            let result = JSON.parse(JSON.stringify(results))
            res.status(200).json({ status: 'success', result: result })
        }
    )
}

module.exports = {
    getAllItems,
    getNewItems,
    getPopularItems,
    getItem,
    searchItems
}
