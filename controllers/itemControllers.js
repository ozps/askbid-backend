const connection = require('../models/dbConnection')

const getAllItems = (req, res) => {
    let query = 'SELECT * FROM Item'
    connection.query(query, (error, results) => {
        if (error) throw error
        let resultsArray = JSON.parse(JSON.stringify(results))
        resultsArray = resultsArray.sort((a, b) =>
            a.ItemBrand + ' ' + a.ItemDesc > b.ItemBrand + ' ' + b.ItemDesc
                ? 1
                : -1
        )
        res.status(200).json(resultsArray)
    })
}

const getNewItems = (req, res) => {
    let query = 'SELECT * FROM Item'
    connection.query(query, (error, results) => {
        if (error) throw error
        let resultsArray = JSON.parse(JSON.stringify(results))
        resultsArray = resultsArray.sort((a, b) =>
            a.ItemReleased < b.ItemReleased ? 1 : -1
        )
        res.status(200).json(resultsArray)
    })
}

const getPopularItems = (req, res) => {
    let query = 'SELECT * FROM Item'
    connection.query(query, (error, results) => {
        if (error) throw error
        let resultsArray = JSON.parse(JSON.stringify(results))
        resultsArray = resultsArray.sort((a, b) =>
            a.ItemClicked < b.ItemClicked ? 1 : -1
        )
        res.status(200).json(resultsArray)
    })
}

const getDetailItem = (req, res) => {
    let query =
        'SELECT * FROM Item WHERE ItemID = ?;UPDATE Item SET ItemClicked = ItemClicked + 1 WHERE ItemID = ?'
    connection.query(
        query,
        [req.params.id, req.params.id],
        (error, results) => {
            if (error) throw error
            queryResults = JSON.parse(JSON.stringify(results))
            res.status(200).json(queryResults[0])
        }
    )
}

const searchItems = (req, res) => {
    let text = req.body.text.trim().toLowerCase()
    let searchResults = []
    let query = 'SELECT * FROM Item'
    connection.query(query, (error, results) => {
        if (error) throw error
        let resultsArray = JSON.parse(JSON.stringify(results))
        resultsArray.forEach(item => {
            if (
                item['ItemBrand'].toLowerCase().includes(text) ||
                item['ItemDesc'].toLowerCase().includes(text) ||
                item['ItemColor'].toLowerCase().includes(text)
            ) {
                searchResults.push(item)
            }
        })
        res.status(200).json(searchResults)
    })
}

module.exports = {
    getAllItems,
    getDetailItem,
    getNewItems,
    getPopularItems,
    searchItems
}
