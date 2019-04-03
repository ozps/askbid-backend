const { Router } = require('express')
const matchControllers = require('../controllers/matchControllers')
const router = new Router()

// Place order
router.post('/place_order', matchControllers.placeOrder)

// Get all matches of a user
router.post('/get_user_match', matchControllers.getUserMatch)

// Get history of a match
router.post('/get_bill', matchControllers.getBill)

// Update shipping
router.post('/update_shipping', matchControllers.updateShipping)

module.exports = router
