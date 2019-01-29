const connection = require('../models/dbConnection')

const getAllItems = (req, res) => {
    let query = 'SELECT * FROM Item'
    connection.query(query, (error, results) => {
        if (error) throw error
        res.status(200).json(results)
    })
}

const getDetailItem = (req, res) => {
    let query = 'SELECT * FROM Item WHERE ItemID = ?'
    connection.query(query, [req.params.id], (error, results) => {
        if (error) throw error
        res.status(200).json(results)
    })
}

const searchItems = (req, res) => {
    let text = req.body.trim()
    let searchResults = []
    let query = 'SELECT * FROM Item'
    connection.query(query, (error, results) => {
        if (error) throw error
        let resultsArray = JSON.parse(JSON.stringify(results))
        resultsArray.array.forEach(item => {
            if (
                item['ItemBrand'].includes(text) ||
                item['ItemDesc'].includes(text)
            ) {
                searchResults.push(item)
            }
        })
        res.status(200).json(results)
    })
}

module.exports = { getAllItems, getDetailItem, searchItems }
