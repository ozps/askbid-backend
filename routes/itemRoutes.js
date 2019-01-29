const { Router } = require('express')
const itemControllers = require('../controllers/itemControllers')
const router = new Router()

// Get all item
router.get('/get_all_items', itemControllers.getAllItems)

// Get detail item
router.get('/get_detail_item/:id', itemControllers.getDetailItem)

// Search items
router.post('/search_items', itemControllers.searchItems)

module.exports = router
