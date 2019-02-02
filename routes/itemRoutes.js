const { Router } = require('express')
const itemControllers = require('../controllers/itemControllers')
const router = new Router()

// Get all item (Sorted by ItemBrand+ItemDesc)
router.get('/get_all_items', itemControllers.getAllItems)

// Get detail item
router.get('/get_detail_item/:id', itemControllers.getDetailItem)

// Get sorted item by price
router.get('/get_new_items', itemControllers.getNewItems)

// Get sorted item by popularity
router.get('/get_popular_items', itemControllers.getPopularItems)

// Search items
router.post('/search_items', itemControllers.searchItems)

module.exports = router
